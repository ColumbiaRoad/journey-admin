import React from 'react';
import { Page, Layout, EmptyState } from '@shopify/polaris';

import SelectedProductListContainer from '../containers/SelectedProductListContainer'
import ProductPickerContainer from '../containers/ProductPickerContainer';
import RootQuestionContainer from '../containers/RootQuestionContainer';
import { parseProductSelectionAnswerMappings, parseAnswerMapping } from '../utils/answerMappingParser';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const allParsingReports = parseProductSelectionAnswerMappings(this.props.selectedProducts);
    const rootAllowedValues = this.props.selectedProducts.map(item => item.product.title);
    allParsingReports.rootQuestion = parseAnswerMapping({
      question: this.props.rootQuestion.question,
      answerMapping: this.props.rootQuestion.answerMapping
    }, rootAllowedValues);
    this.props.onSave(allParsingReports);
  }

  render() {
    return (
      <Page
        title={this.props.selectedProducts.length > 0 ? 'Questionnaire' : ''}
        primaryAction={{
          content: 'Save',
          onAction: this.onSave
        }} >
        <Layout>
          <Layout.Section>
          { this.props.selectedProducts.length === 0 &&
              <EmptyState
                heading='No products selected'
                action={{
                  content: 'Select products',
                  onAction: () => { this.props.onToggle('set') }
                }}
                image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
              >
                <p>Select products to create questions and map possible answers to product option values.</p>
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
