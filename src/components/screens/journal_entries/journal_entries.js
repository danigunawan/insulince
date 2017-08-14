import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Separator,
  Header,
  Left,
  Right,
  Title,
  Body,
  Button,
  Icon,
  Spinner
} from 'native-base';
import { StyleSheet, ListView, Image } from 'react-native';
import Footer from '../footer/footer';

export default class JournalEntries extends Component {
  componentDidMount() {
    this.props.fetchAllJournalEntries()
      .then(()  => {
        const { journalEntries } = this.props;
        this.breakfastItems = [];
        this.lunchItems = [];
        this.dinnerItems = [];
        this.snackItems = [];
        if (this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.currentEntryId) {
          this.currentEntryId = this.props.navigation.state.params.currentEntryId;
          journalEntries.byId[this.currentEntryId].breakfast
            .forEach(breakfastItem => {
              this.breakfastItems.push(breakfastItem);
            });
          journalEntries.byId[this.currentEntryId].lunch
            .forEach(lunchItem => {
              this.lunchItems.push(lunchItem);
            });
          journalEntries.byId[this.currentEntryId].dinner
            .forEach(dinnerItem => {
              this.dinnerItems.push(dinnerItem);
          });
          journalEntries.byId[this.currentEntryId].snacks
            .forEach(snackItem => {
              this.snackItems.push(snackItem);
            });
        } else {
          this.currentEntryId = journalEntries.allIds[journalEntries.allIds.length - 1];
        }
        this.currentEntryDate = new  Date(journalEntries[this.currentEntryId].created_at);
        this.setState({
          currentEntryId: this.currentEntryId,
          currentEntryDate: this.currentEntryDate,
          breakfastItems: this.breakfastItems,
          lunchItems: this.lunchItems,
          dinnerItems: this.dinnerItems,
          snackItems: this.snackItems
        });
        this.checkLeftForEntry();
        this.checkRightForEntry();
      });
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      currentEntryId: "",
      currentEntryDate: "",
      basic: true,
      breakfastItems: "",
      lunchItems: "",
      dinnerItems: "",
      snackItems: "",
      right: false,
      left: true
    };
    this.addFood = this.addFood.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.leftDate = this.leftDate.bind(this);
    this.rightDate = this.rightDate.bind(this);
  }

  addFood(key) {
    return () => {
      this.props.navigation.navigate('FoodSearch', {
        key: key,
        journalEntryId: this.state.currentEntryId
      });
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  leftDate() {
    let currentIdx = this.props.journalEntries.indexOf(this.state.currentEntryId);
    this.props.navigation.navigate('JournalEntries', { currentEntryId: this.props.journalEntries.allIds[currentIdx + 1] });
  }

  rightDate() {
    let currentIdx = this.props.journalEntries.indexOf(this.state.currentEntryId);
    this.props.navigation.navigate('JournalEntries', { currentEntryId: this.props.journalEntries.allIds[currentIdx - 1] });
  }

  checkLeftForEntry() {
    const { journalEntries } = this.props;
    const { currentEntryId, currentEntryDate } = this.state;
    if (currentEntryId) {
      let idx = journalEntries.allIds.indexOf(currentEntryId);
      if (idx > 0 && !this.state.left) {
        this.setState({
          left: true
        });
      } else {
        if (idx === 0 && this.state.left) {
          this.setState({
            left: false
          });
        }
      }
    }
  }

  checkRightForEntry() {
    const { journalEntries } = this.props;
    const { currentEntryId, currentEntryDate } = this.state;
    if (currentEntryId) {
      let idx = journalEntries.allIds.indexOf(currentEntryId);
      if (idx < journalEntries.allIds.length - 1 && !this.state.right) {
        this.setState({
          right: true
        });
      } else {
        if (idx === journalEntries.allIds.length - 1 && this.state.right) {
          this.setState({
            right: false
          });
        }
      }
    }
  }

  render() {
    let date;
    let content =
      <Content
        style={{ backgroundColor: 'white' }}>
        <Spinner color='#621E2F' />
      </Content>;
    if (this.state.currentEntryId) {
      content =
        <Content>
          <Separator bordered
            style={ styles.separator }>
            <Text style={ styles.separatorText }>
              BREAKFAST
            </Text>
          </Separator>
          <ListItem
            onPress={ this.addFood('breakfast') }
            style={ styles.addListItem }>
            <Text style={ styles.addFoodText }>
              + ADD FOOD
            </Text>
          </ListItem>
          <List
            enableEmptySections
            style={{ backgroundColor: 'white' }}
            dataSource={this.ds.cloneWithRows(this.state.breakfastItems)}
            renderRow={data =>
              <ListItem style={ styles.resultInfo }>
                <Text style={ styles.resultName }>
                  {data.item_name}
                </Text>
                <Text style={ styles.infoText }>
                  { `${data.brand_name}, ${data.nf_serving_size_qty} ${data.nf_serving_size_unit}` }
                </Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75} />
          <Separator bordered
            style={ styles.separator }>
            <Text style={ styles.separatorText }>
              LUNCH
            </Text>
          </Separator>
          <ListItem
            onPress={ this.addFood('lunch') }
            style={ styles.addListItem }>
            <Text style={ styles.addFoodText }>
              + ADD FOOD
            </Text>
          </ListItem>
          <List
            enableEmptySections
            style={{ backgroundColor: 'white' }}
            dataSource={this.ds.cloneWithRows(this.state.lunchItems)}
            renderRow={data =>
              <ListItem style={ styles.resultInfo }>
                <Text style={ styles.resultName }>
                  {data.item_name}
                </Text>
                <Text style={ styles.infoText }>
                  { `${data.brand_name}, ${data.nf_serving_size_qty} ${data.nf_serving_size_unit}` }
                </Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75} />
            <Separator bordered
              style={ styles.separator }>
              <Text style={ styles.separatorText }>
                DINNER
              </Text>
            </Separator>
            <ListItem
              onPress={ this.addFood('dinner') }
              style={ styles.addListItem }>
              <Text style={ styles.addFoodText }>
                + ADD FOOD
              </Text>
            </ListItem>
            <List
              enableEmptySections
              style={{ backgroundColor: 'white' }}
              dataSource={this.ds.cloneWithRows(this.state.dinnerItems)}
              renderRow={data =>
                <ListItem style={ styles.resultInfo }>
                  <Text style={ styles.resultName }>
                    {data.item_name}
                  </Text>
                  <Text style={ styles.infoText }>
                    { `${data.brand_name}, ${data.nf_serving_size_qty} ${data.nf_serving_size_unit}` }
                  </Text>
                </ListItem>}
              renderLeftHiddenRow={data =>
                <Button full onPress={() => alert(data)}>
                  <Icon active name="information-circle" />
                </Button>}
              renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                  <Icon active name="trash" />
                </Button>}
              leftOpenValue={75}
              rightOpenValue={-75} />
              <Separator bordered
                style={ styles.separator }>
                <Text style={ styles.separatorText }>
                  SNACKS
                </Text>
              </Separator>
              <ListItem
                onPress={ this.addFood('snacks') }
                style={ styles.addListItem }>
                <Text style={ styles.addFoodText }>
                  + ADD FOOD
                </Text>
              </ListItem>
              <List
                enableEmptySections
                style={{ backgroundColor: 'white' }}
                dataSource={this.ds.cloneWithRows(this.state.snackItems)}
                renderRow={data =>
                  <ListItem style={ styles.resultInfo }>
                    <Text style={ styles.resultName }>
                      {data.item_name}
                    </Text>
                    <Text style={ styles.infoText }>
                      { `${data.brand_name}, ${data.nf_serving_size_qty} ${data.nf_serving_size_unit}` }
                    </Text>
                  </ListItem>}
                renderLeftHiddenRow={data =>
                  <Button full onPress={() => alert(data)}>
                    <Icon active name="information-circle" />
                  </Button>}
                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                  <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                    <Icon active name="trash" />
                  </Button>}
                leftOpenValue={75}
                rightOpenValue={-75} />
        </Content>;
    }
    return (
      <Image
        source={{ uri: 'https://res.cloudinary.com/malice/image/upload/v1502485970/insulince-gradient_wofrfg.png' }}
        style={ styles.backgroundImage }>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="md-arrow-back" />
              </Button>
            </Left>
            <Body style={ styles.headerBody }>
              <Icon
                disabled={ !this.state.left }
                onPress={ this.leftDate }
                style={ styles.headerIcons }
                name="ios-arrow-back" />
              <Title>
                {
                 `${this.state.currentEntryDate.getMonth()}/${this.state.currentEntryDate.getDate()}/${this.state.currentEntryDate.getFullYear()}`
                }
              </Title>
              <Icon
                disabled={ !this.state.right }
                onPress={ this.rightDate }
                style={ styles.headerIcons }
                name="ios-arrow-forward" />
            </Body>
            <Right />
          </Header>
          { content }
          <Footer navigation={ this.props.navigation } />
        </Container>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  separator: {
    backgroundColor: 'transparent'
  },
  separatorText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  headerBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerIcons: {
    color: 'white'
  },
  resultName: {
    paddingLeft: 14,
    alignSelf: 'flex-start'
  },
  addFoodText: {
    paddingLeft: 14,
    alignSelf: 'flex-start',
    fontWeight: '700'
  },
  resultInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  infoText: {
    paddingLeft: 14,
    alignSelf: 'flex-start',
    fontSize: 12
  },
  addListItem: {
    backgroundColor: 'white',
    marginLeft: 0
  }
});
