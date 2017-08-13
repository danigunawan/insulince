import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Button,
  Title
} from 'native-base';
import Footer from '../footer/footer';

export default class Account extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Your Account</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <Icon name="ios-person" />
              </Left>
              <Body>
                <Text>{ this.props.currentUser.username }</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="ios-mail" />
              </Left>
              <Body>
                <Text>{ this.props.currentUser.email }</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="ios-key" />
              </Left>
              <Body>
                <Text>Change your password</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="ios-log-out" />
              </Left>
              <Body>
                <Text>Log out</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
        <Footer navigation={ this.props.navigation } />
      </Container>
    );
  }
}
