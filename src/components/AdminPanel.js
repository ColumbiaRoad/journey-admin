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

  containsErrors(allParsingReports) {
    return Object.keys(allParsingReports).map((key) => {
      return allParsingReports[key].valid;
    }).includes(false);
  }

  buildQuestionnaire() {
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

  onSave() {
    const allParsingReports = parseProductSelectionAnswerMappings(this.props.selectedProducts);
    const rootAllowedValues = this.props.selectedProducts.map(item => item.product.title);
    allParsingReports.rootQuestion = parseAnswerMapping({
      question: this.props.rootQuestion.question,
      answerMapping: this.props.rootQuestion.answerMapping
    }, rootAllowedValues);
    this.props.onSave(allParsingReports);
    if(!this.containsErrors(allParsingReports)) {
      fetch(`http://localhost:9000/api/v1/shop/questionnaire`, {
        method: 'post',
        headers: { 
          'Authorization': `Bearer ${this.props.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionnaire: this.buildQuestionnaire()
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
    let questionnaire;
    fetch(`http://localhost:9000/api/v1/shop/questionnaire`, {
      method: 'get',
      headers: { 'Authorization': `Bearer ${this.props.token}` },
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      questionnaire = json.questionnaire;
      return fetch(`http://localhost:9000/api/v1/products?fields=id,options,title`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${this.props.token}` }
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const storeQuestionnaire = {
        rootQuestion: questionnaire.rootQuestion,
        selectedProducts: questionnaire.selectedProducts.map((item) => {
          return {
            product: json.find(e => e.id === parseInt(item.productId, 10)),
            questions: item.questions
          };
        })
      };
      this.props.onFetch(storeQuestionnaire);
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
