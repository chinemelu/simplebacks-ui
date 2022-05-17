<template>
  <div class="single-page">
    <div class="single-page__left">
      <p><span class="text-bold mr-xs">Order Id:</span> {{ orderItem.id }}</p>
      <p class="mt-sm"><span class="text-bold mr-xs">Product Id:</span> {{ orderItem.product_id  }}</p>
      <p class="mt-sm"><span class="text-bold mr-xs">Product Category:</span> {{ orderItem.product_category  }}</p>
      <p class="mt-sm"><span class="text-bold mr-xs">Price:</span>${{ orderItem.price  }}</p>
      <p class="mt-sm"><span class="text-bold mr-xs">Shipping limit date:</span>
        {{ new Date(orderItem.date).toLocaleDateString(undefined) }}
      </p>
    </div>
    <div class="single-page__right">
      <BaseButton type="submit" class="single-page__btn single-page__delete-btn" @click="deleteOrderItem">Delete</BaseButton>
      <BaseButton type="submit" class="single-page__btn single-page__edit-btn" @click="goToEditPage">Edit</BaseButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['changeShowLoaderStatus'])
const orderItem = ref({})
const store = useStore()
const router = useRouter()
const toast = useToast()

onMounted(() => {
  orderItem.value = JSON.parse(localStorage.getItem('orderItem'))
})

const deleteOrderItem = async () => {
  try {
    emit('changeShowLoaderStatus', true)
    await store.dispatch('deleteOrderItem', orderItem.value.id)
    emit('changeShowLoaderStatus', false)
    toast.success('You have successfully deleted the item')
    router.push({ name: 'OrderList' })
  } catch (err) {
    toast.error(err)
    emit('changeShowLoaderStatus', false)
  }
}

const goToEditPage = () => {
  router.push({ name: 'EditOrderItem', params: { id: orderItem.value.id } })
}
</script>

<style lang="scss" scoped>
.single-page {
  max-width: 80%;
  margin: 0 auto;
  padding: 10rem 0;
  font-size: 1.6rem;
  display: flex;
  text-align: center;
  &__left {
    flex-basis: 50%;
  }
  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  &__btn {
    width: 50%;
  }
}
</style>
