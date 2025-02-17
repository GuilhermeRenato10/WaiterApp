import { FlatList, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { CartItem } from "../../types/CartItem";
import { formatPrice } from "../../utils/formatPrice";
import { Item, ProductContainer, Actions, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from "./styles";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Button } from "../Button";
import { Product } from "../../types/Product";
import { OrderConfirmedModal } from "../OrderConfirmedModal.tsx";
import { useState } from "react";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder }: CartProps) {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  function handleConfirmOrder() {
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>

      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {cartItems.length > 0 && (
        <FlatList
        data={cartItems}
        keyExtractor={cartItem => cartItem.product._id}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 20 }}
        renderItem={({ item: cartItem }) => (
          <Item>
            <ProductContainer>
              <Image
                source={{
                  uri: `http://192.168.0.38:3001/uploads/${cartItem.product.imagePath}`
                }}
              />

              <QuantityContainer>
                <Text size={14} color="#666">{cartItem.quantity}x</Text>
              </QuantityContainer>

              <ProductDetails>
                <Text size={14} weight="600">{cartItem.product.name}</Text>
                <Text size={14} color="#666" style={{ marginTop: 4, maxHeight: 130 }}>
                  {formatPrice(cartItem.product.price)}
                </Text>
              </ProductDetails>
              </ProductContainer>

            <Actions>
              <TouchableOpacity
                style={{ marginRight: 24}}
                onPress={() => onAdd(cartItem.product)}
              >
                <PlusCircle />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                <MinusCircle />
              </TouchableOpacity>
            </Actions>
          </Item>
        )}
      />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">{formatPrice(total)}</Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
