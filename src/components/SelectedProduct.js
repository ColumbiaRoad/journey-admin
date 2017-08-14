import React from 'react';
import PropTypes from 'prop-types';
import { Card, Banner, List } from '@shopify/polaris';
import { uniq } from 'lodash'
import SelectedProductOptionContainer from '../containers/SelectedProductOptionContainer';
import { parseProductAnswerMappings, PARSING_ERRORS } from '../utils/answerMappingParser';
export default class SelectedProductList extends React.Component {
  static contextTypes = {
    easdk: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    this.props.onUpdateParsingReport({
      productId: this.props.item.product.id,
      parsingReport: parseProductAnswerMappings(this.props.item)
    });
  }

  getErrorList() {
    // Flatmap all mapping errors as well as question errors and remove duplicates
    return uniq([].concat(...Object.keys(this.props.item.parsingReport).map((k) => {
      if(!this.props.item.parsingReport[k].valid){
        return [
          ...this.props.item.parsingReport[k].questionErrors,
          ...this.props.item.parsingReport[k].mappingErrors.map((e) => {
            return e.errorCode;
          })
        ];
      }
      return [];
    })));
  }

  render() {
    const errorList = this.getErrorList();
    return (
      <Card
        title={this.props.item.product.title}
        key={this.props.item.product.id}
        sectioned
        actions={[
          {
            content: 'Remove',
            onAction: () => this.props.onDelete(this.props.item.product.id)
          },
          {
            content: 'View',
            onAction: () => this.context.easdk.redirect(`/products/${this.props.item.product.id}`)
          }
        ]}
        secondaryFooterAction={{
            content: 'Save',
            onAction: this.onSave
        }} >
        { errorList.length > 0 &&
          <Banner
            title="Product question(s) could not be saved"
            status="critical"
          >
            <p>Please resolve the following issues:<br /><br /></p>
            <List type="bullet">
            { 
              errorList.map((e) => {
                return <List.Item key={e}>{PARSING_ERRORS[e]}</List.Item>
              })
            }
            </List>
          </Banner>
        }
        {
          this.props.item.product.options.map((option) => {
            const errors = this.props.item.parsingReport[option.name] && !this.props.item.parsingReport[option.name].valid
              ? this.props.item.parsingReport[option.name]
              : false;
            return (
              // Rather pass data as props than making redux store more complicated
              <SelectedProductOptionContainer
                option={option}
                productId={this.props.item.product.id}
                key={option.position}
                errors={errors} />
            );
          })
        }
      </Card>
    );
  }
}
