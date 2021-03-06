import {Header, Icon, Accordion, Label, Segment, Button, List, Image} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import formatDate from '../../utils/formatDate';

function AccountOrders({orders}) {

  const router = useRouter();

  function mapOrdersToPanels(orders){
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color='blue' content={formatDate(order.createdAt)} />
      },
      content: {
        content: (
          <>
            <List.Header as='h3'>
              Total: ₹{order.total}
              <Label 
                content={order.email}
                basic
                icon='mail'
                horizontal
                style={{marginLeft: '1em'}}
              />
            </List.Header>
            <List>
              {order.products.map(p => (
                <List.Item key={p.product._id}>
                  <Image avatar size = 'tiny' src={p.product.mediaUrl} />
                  <List.Content>
                    <List.Header as='a' 
                      onClick={() => router.push(`/product?_id=${p.product._id}`)}>{p.product.name}</List.Header>
                    <List.Description>
                      {p.quantity} x ₹{p.product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated='right'>
                    <Label tag color='green' size='small'>
                      {p.product.sku}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </>
        )
      }
    }))
  }

  return <>
    <Header as='h2'>
      <Icon name='folder open' />
      Order History
    </Header>
    {orders.length === 0 ? (
      <Segment inverted tertiary color='grey' textAlign='center'>
        <Header icon>
          <Icon name='copy outline' />
          No past orders
        </Header>
        <div>
          <Button color='orange' onClick={() => router.push('/')} >  
            View Products
          </Button>
        </div>
      </Segment>
    ) : (
      <Accordion 
        fluid
        styled
        exclusive={false}
        panels={mapOrdersToPanels(orders)}
      />
    )
    }
  </>;
}

export default AccountOrders;
