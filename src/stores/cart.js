import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref({
    items: [],
    total: 0,
    totalItem: 0
  })


  function addproduct(product) {
    const existingproduct = cart.value.items.find((item) => item.id === product.id)
    if (existingproduct) {
      existingproduct.quantity++
    } else {
      cart.value.items.push({ ...product, quantity: 1 })
    }
    cart.value.total += product.price
    cart.value.totalItem += 1
    // alert(`Adicionado ${product.title} ao carrinho!`)
  }

  function incrementproductToCart(product) {
    const existingproduct = cart.value.items.find((item) => item.id === product.id)
    existingproduct.quantity++
    cart.value.total += product.price
    cart.value.totalItem += 1    
  }

  function decrementproductToCart(product) {
    const existingproduct = cart.value.items.find((item) => item.id === product.id)
    if (existingproduct.quantity === 1) {
      cart.value.items = cart.value.items.filter((item) => item.id !== product.id)
    } else {
      existingproduct.quantity--
    }
    cart.value.total -= product.price
    cart.value.totalItem -= 1    
  }

  function addOrReplaceByCategory(product) {
    const index = cart.value.items.findIndex(item => item.category === product.category)

    if (index !== -1) {
      // Mesmo item -> não faz nada
      if (cart.value.items[index].id === product.id) return

      // Subtrai valor antigo
      cart.value.total -= cart.value.items[index].price * cart.value.items[index].quantity

      // Substitui pelo novo
      cart.value.items[index] = { ...product, quantity: 1 }
      cart.value.total += product.price
    } else {
      cart.value.items.push({ ...product, quantity: 1 })
      cart.value.total += product.price
    }
  }

  return {
    cart,    
    addproduct,
    incrementproductToCart,
    decrementproductToCart,
    addOrReplaceByCategory
  }
})
