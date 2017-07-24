import React from 'react';
import { Page, Card, Banner, Button } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';
//import products from '../products.json' //COMMENT OUT FOR PRODUCTION

import SelectedProdcutList from '../containers/SelectedProductListContainer';
import SurveyQuestions from '../containers/SurveyQuestionsContainer';
import AnswerQuestions from './AnswerQuestions';

export default class AdminPanel extends React.Component {
  render() {
    //this.props.onSelect(products);
    return (
      <Page>
        <Banner title="Yay it worked!">
          <p>The embedded polaris app has been successfully loaded</p>
        </Banner>

        <Card sectioned>
          <Button
            onClick={() => {
              this.props.onToggle();
            }}
          >
            Select Prodcuts
          </Button>
        </Card>
        <ResourcePicker
          products
          allowMultiple
          open={this.props.open}
          onSelection={(resources) => {
            const selectedProducts = resources.products.map((p) => {
              return {
                id: p.id,
                title: p.title,
                options: p.options,
                variantCount: p.variants.length,
                tags: p.tags
              };
            });
            this.props.onSelect(selectedProducts);
          }}
          onCancel={() => this.props.onToggle()}
        />
      { (this.props.selection > 0 && this.props.survey_state === 'INITIAL') &&
          <SelectedProdcutList /> }
      { (this.props.survey_state === 'SURVEY_QUESTION') && <SurveyQuestions/> }
      { (this.props.survey_state === 'ANSWER') && <AnswerQuestions/> }
      </Page>
    );
  }
}
