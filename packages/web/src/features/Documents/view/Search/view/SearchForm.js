import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import _ from 'lodash';

import { DefaultButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { DatePicker, DayOfWeek } from '@fluentui/react/lib/DatePicker';

import {
  DayPickerStrings,
  formatDate,
  parseDateFromString,
} from '../../../../../utils/timeUtils';
import {
  getNumberOrEmptyErrorMessage,
  isNumberOrEmpty,
} from '../../../../../utils/numberUtils';

import {
  setSearchParams as setSearchParamsAction,
  resetSearchParams as resetSearchParamsAction,
  selectSearchParams,
} from '../../../redux/SearchBarData';

import styles from './SearchForm.module.scss';

const stackTokensChildrenGap10 = { childrenGap: 10 };

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParams: {},
      isSearchDisabled: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps !== this.props &&
      !_.isEqual(this.props.searchParams, this.state.searchParams)
    ) {
      this.setState({
        searchParams: this.props.searchParams,
      });
    }
  }

  onSearchFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.setSearchParams(this.state.searchParams);
  };

  resetSearchParams = () => {
    this.props.resetSearchParams();
  };

  setDocumentId = (event, value) => {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        documentId: value,
      },
    });
  };

  setSubject = (event, value) => {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        subject: value,
      },
    });
  };

  setCustomerName = (event, value) => {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        customerName: value,
      },
    });
  };

  setDateFrom = (value) => {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        // don't do lodash equality here - date has no keys and is empty for lodash
        dateFrom: value ? formatDate(value) : '',
      },
    });
  };

  setDateTo = (value) => {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        dateTo: value ? formatDate(value) : '',
      },
    });
  };

  setAmountFrom = (event, value) => {
    this.setState(
      {
        searchParams: {
          ...this.state.searchParams,
          amountFrom: value,
        },
      },
      () => this.checkAmountValidity(),
    );
  };

  setAmountTo = (event, value) => {
    this.setState(
      {
        searchParams: {
          ...this.state.searchParams,
          amountTo: value,
        },
      },
      () => this.checkAmountValidity(),
    );
  };

  checkAmountValidity = () => {
    this.setState({
      isSearchDisabled:
        !isNumberOrEmpty(this.state.searchParams.amountFrom) ||
        !isNumberOrEmpty(this.state.searchParams.amountTo),
    });
  };

  render() {
    return (
      <form onSubmit={this.onSearchFormSubmit}>
        <Stack className={styles.paddingBottom30}>
          <Stack className={styles.borderBottomNaturalGray80}>
            <Stack horizontal disableShrink className={styles.paddingBottom20}>
              <TextField
                className={styles.searchTextFields}
                label="Nummer enthält"
                value={this.state.searchParams.documentId || ''}
                onChange={this.setDocumentId}
              />
              <TextField
                className={styles.searchTextFields}
                label="Betreff enthält"
                value={this.state.searchParams.subject || ''}
                onChange={this.setSubject}
              />
              <TextField
                className={styles.searchTextFields}
                label="Kundenname enthält"
                value={this.state.searchParams.customerName || ''}
                onChange={this.setCustomerName}
              />
              <Stack tokens={stackTokensChildrenGap10}>
                <Stack.Item>
                  <Stack
                    horizontal
                    tokens={stackTokensChildrenGap10}
                    className={styles.searchTextFields}
                  >
                    {/* TODO: check invalid dates, maybe use masked fields */}
                    <DatePicker
                      firstDayOfWeek={DayOfWeek.Monday}
                      strings={DayPickerStrings}
                      showWeekNumbers
                      firstWeekOfYear={1}
                      showMonthPickerAsOverlay
                      placeholder="Auswählen..."
                      ariaLabel="Auswählen"
                      label="Datum von"
                      allowTextInput
                      formatDate={formatDate}
                      parseDateFromString={parseDateFromString}
                      value={
                        this.state.searchParams.dateFrom
                          ? parseDateFromString(
                              this.state.searchParams.dateFrom || '',
                            )
                          : ''
                      }
                      onSelectDate={this.setDateFrom}
                    />
                    <TextField
                      onGetErrorMessage={getNumberOrEmptyErrorMessage}
                      label="Betrag von"
                      value={this.state.searchParams.amountFrom || ''}
                      onChange={this.setAmountFrom}
                    />
                  </Stack>
                </Stack.Item>
                <Stack.Item>
                  <Stack
                    horizontal
                    tokens={stackTokensChildrenGap10}
                    className={styles.searchTextFields}
                  >
                    <DatePicker
                      firstDayOfWeek={DayOfWeek.Monday}
                      strings={DayPickerStrings}
                      showWeekNumbers
                      firstWeekOfYear={1}
                      showMonthPickerAsOverlay
                      placeholder="Auswählen..."
                      ariaLabel="Auswählen"
                      label="Datum bis"
                      allowTextInput
                      formatDate={formatDate}
                      parseDateFromString={parseDateFromString}
                      value={
                        this.state.searchParams.dateTo
                          ? parseDateFromString(
                              this.state.searchParams.dateTo || '',
                            )
                          : ''
                      }
                      onSelectDate={this.setDateTo}
                    />
                    <TextField
                      onGetErrorMessage={getNumberOrEmptyErrorMessage}
                      label="Betrag bis"
                      value={this.state.searchParams.amountTo || ''}
                      onChange={this.setAmountTo}
                    />
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack>
            <Stack className={styles.paddingBottom30}>
              <Stack.Item align="end">
                <Stack horizontal tokens={stackTokensChildrenGap10}>
                  <DefaultButton onClick={this.resetSearchParams}>
                    Zurücksetzen
                  </DefaultButton>
                  <DefaultButton
                    disabled={this.state.isSearchDisabled}
                    type="submit"
                  >
                    Suchen
                  </DefaultButton>
                </Stack>
              </Stack.Item>
            </Stack>
          </Stack>
        </Stack>
      </form>
    );
  }
}

SearchForm.propTypes = {
  searchParams: PropTypes.object,
  setSearchParams: PropTypes.func.isRequired,
  resetSearchParams: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  searchParams: {},
};

const mapStateToProps = (state) => ({
  searchParams: selectSearchParams(state),
});

const mapDispatchToProps = {
  setSearchParams: setSearchParamsAction,
  resetSearchParams: resetSearchParamsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
