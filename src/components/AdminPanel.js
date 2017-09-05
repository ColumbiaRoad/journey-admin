import React from 'react';
import { Page, Layout, EmptyState } from '@shopify/polaris';
import 'whatwg-fetch';

import SelectedProductListContainer from '../containers/SelectedProductListContainer'
import ProductPickerContainer from '../containers/ProductPickerContainer';
import RootQuestionContainer from '../containers/RootQuestionContainer';
import { parseProductSelectionAnswerMappings, parseAnswerMapping } from '../utils/answerMappingParser';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  /**
   * Check validity of all parsing reports
   * @param {Object} allParsingReports
   * @returns {boolean} errorsPresent
   */
  containsErrors(allParsingReports) {
    const { rootQuestion, ...selectedProducts } = allParsingReports;
    const validity = [
      rootQuestion.valid,
      ...Object.keys(selectedProducts).map((key) => {
        return Object.keys(selectedProducts[key]).map((report) => {
          return selectedProducts[key][report].valid;
        })
      })
    ];
    // Flatmap arrays and check whether all are valid
    return [].concat.apply([], validity).includes(false);
  }

  /**
   * Remove product information from questionnaire before saving
   * it to database.
   * @returns {Object}
   */
  reduceQuestionnaire() {
    const questionnaire = {};
    questionnaire.rootQuestion = {
      question: this.props.rootQuestion.question,
      answerMapping: this.props.rootQuestion.answerMapping
    };
    questionnaire.selectedProducts = this.props.selectedProducts.map((item) => {
      return {
        productId: item.product.id,
        questions: item.questions
      };
    });
    return questionnaire;
  }

  /**
   * Restores reduced questionnaire from database to the original version
   * that includes product information.
   * @param {Object} questionnaire 
   * @param {Array<Object>} products
   * @returns {Object} originalQuestionnaire
   */
  restoreQuestionnaire(questionnaire, products) {
    return {
      rootQuestion: {
        ...questionnaire.rootQuestion,
        answerMapping: questionnaire.rootQuestion.answerMapping.map((mapping) => {
          return {
            ...mapping,
            value: parseInt(mapping.value, 10)
          };
        })
      },
      selectedProducts: questionnaire.selectedProducts.map((item) => {
        return {
          product: products.find(e => e.id === parseInt(item.productId, 10)),
          questions: item.questions
        };
      })
    };
  }

  /**
   * Fetch products with passed IDs from Shopify through backend API.
   * Included fields are:
   * - id
   * - opitons
   * - title
   * @param {string} productIds
   * @return {Promise<Array>} Products
   */
  fetchProducts(productIds) {
    return new Promise((resolve, reject) => {
      fetch(`/api/v1/products?ids=${productIds}&fields=id,options,title`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${this.props.token}` }
      })
      .then((response) => {
        if(response.status === 200) {
          return response.json();
        } else {
          Promise.reject(response.text());
        }
      })
      .then((json) => {
        resolve(json);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  onSave() {
    // Get parsing report of all selected products and update redux store
    const allParsingReports = parseProductSelectionAnswerMappings(this.props.selectedProducts);
    const rootAllowedValues = this.props.selectedProducts.map(item => item.product.id);
    allParsingReports.rootQuestion = parseAnswerMapping({
      question: this.props.rootQuestion.question,
      answerMapping: this.props.rootQuestion.answerMapping
    }, rootAllowedValues);
    this.props.onSave(allParsingReports);

    // Save questionnaire to database
    if(!this.containsErrors(allParsingReports)) {
      fetch(`/api/v1/shop/questionnaire`, {
        method: 'post',
        headers: { 
          'Authorization': `Bearer ${this.props.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionnaire: this.reduceQuestionnaire() // Remove unnecessary info before saving questionnaire
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

  componentDidMount() {
    // Try to fetch questionnaire from database
    let questionnaire;
    fetch(`/api/v1/shop/questionnaire`, {
      method: 'get',
      headers: { 'Authorization': `Bearer ${this.props.token}` },
    })
    .then((response) => {
      if(response.status === 200) {
        return response.json();
      } else {
        Promise.reject(response.text());
      }
    })
    .then((json) => {
      if (json.status === 'ok') {
        questionnaire = json.questionnaire;
        const productIds = questionnaire.selectedProducts.map(item => item.productId).join();
        return this.fetchProducts(productIds);
      } else {
        return Promise.reject('No existing questionnaire found');
      }
    })
    .then((products) => {
      // Save restored questionnaire in store
      this.props.onQuestionnaire(this.restoreQuestionnaire(questionnaire, products));
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    // Only show save option if products have been selected
    const primaryAction = this.props.selectedProducts.length > 0 
      ? {primaryAction: {
        content: 'Save',
        onAction: this.onSave
      }}
      : {};
    return (
      <Page
        title={this.props.selectedProducts.length > 0 ? 'Questionnaire' : ''}
        {...primaryAction} >
        <Layout>
          <Layout.Section>
          { this.props.selectedProducts.length === 0 &&
              <EmptyState
                heading='No products selected'
                action={{
                  content: 'Select products',
                  onAction: () => { this.props.onToggle('set') }
                }}
                image='https://cdn.shopify.com/s/assets/admin/empty-states-fresh/emptystate-pages-9fc4d1bc367cc2ce06e3404e37068eeaa8483fa736ea6c0e3bdc251807d1f76b.svg'
              >
                <p>Select products to create a questionnaire and boost your sales.</p>
              </EmptyState>
          }
          { (process.env.NODE_ENV !== 'development') &&
              <ProductPickerContainer /> }
          </Layout.Section>
          <Layout.Section>
            { this.props.selectedProducts.length > 0 &&
              <div>
                <RootQuestionContainer />
                <SelectedProductListContainer />
              </div> }
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

export default AdminPanel;
