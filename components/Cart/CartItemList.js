import {Header, Segment, Button, Icon} from 'semantic-ui-react';

function CartItemList() {
  const user = false;
  return (
    <Segment secondary color='teal' inverted textAlign='center' placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        No product in your cart. Add some!
      </Header>
        <div>
          {user ? (
            <Button color='orange'>
              View Products
            </Button>
          ) : 
          (
            <Button color='facebook'>
              Login to add products
            </Button>
          )}
        </div>
    </Segment>
  )
}

export default CartItemList;
