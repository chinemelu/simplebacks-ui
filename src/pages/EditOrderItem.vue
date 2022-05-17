 <template>
  <form class="edit-resource">
    <div class="edit-resource__inner-container mb-md">
      <div>
        <label class="edit-resource__label">OrderId</label>
        <BaseInput
          disabled
          placeholder="orderId"
          class="edit-resource__input"
          v-model="orderId"
        />
      </div>

      <div>
        <label class="edit-resource__label">ProductId</label>
        <BaseInput
          disabled
          placeholder="ProductId"
          label="ProductId"
          class="edit-resource__input"
          v-model="productId"
        />
      </div>
    <div>
      <label class="edit-resource__label">Product Category</label>
      <BaseInput
        placeholder="Body"
        disabled
        label="Product Category"
        class="edit-resource__input"
        v-model="productCategory"
      />
    </div>
    <div>
      <label class="edit-resource__label">Price($)</label>
      <BaseInput
        disabled
        placeholder="Price"
        label="Price"
        class="edit-resource__input"
        v-model="price"
      />
    </div>
    <div>
      <label class="edit-resource__label">Date</label>
      <BaseInput
        disabled
        placeholder="Body"
        label="Shipping Limit Date"
        type="date"
        class="edit-resource__input"
        v-model="shippingLimitDate"
      />
    </div>
    </div>
    <BaseButton
      class="edit-resource__btn"
      @click="$router.push({ name: 'OrderList' })"
    >
      Edit
    </BaseButton>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const orderItem = ref({})
const orderId = ref('')
const productId = ref('')
const productCategory = ref('')
const price = ref(0)
const shippingLimitDate = ref(new Date())

onMounted(() => {
  orderItem.value = JSON.parse(localStorage.getItem('orderItem'))
  orderId.value = orderItem.value.id
  productId.value = orderItem.value.product_id
  productCategory.value = orderItem.value.product_category
  price.value = orderItem.value.price
  shippingLimitDate.value = new Date(orderItem.value.date).toLocaleDateString('en-US')
})

</script>

<style lang="scss" scoped>
.edit-resource {
  &__inner-container {
    padding: 5rem 1rem;
    cursor: pointer;
    @include grid-justify-content;
    grid-template-columns: repeat(auto-fill, 100%);
    @include margin-center;
    @include tablet-landscape-up {
      max-width: 80%;
      grid-template-columns: repeat(auto-fill, 30%);
    }
    @include desktop-up {
      max-width: 80%;
      grid-template-columns: repeat(auto-fill, 40%);
    }
  }
  &__label {
    display: block;
    font-size: 1.6rem;
  }
}
</style>
