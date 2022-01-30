<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header">
          <strong>{{
            this.$route.params.edit
              ? 'Edit Product #' + this.$route.params.edit
              : 'Create New Product'
          }}</strong>
        </div>
        <div class="card-body card-block">
          <div class="form-group">
            <label for="title" class="form-control-label"
              >Title <span class="required-in">*</span></label
            >
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter product title"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="category_id" class="form-control-label"
              >Category <span class="required-in">*</span></label
            >
            <select
              id="category_id"
              name="category_id"
              class="form-control"
            ></select>
          </div>
          <div class="form-group">
            <label for="product_code" class="form-control-label"
              >Product Code</label
            >
            <input
              id="product_code"
              type="text"
              name="product_code"
              placeholder="Product code"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="brand_id" class="form-control-label">Brand </label>
            <select id="brand_id" name="brand_id" class="form-control">
              <option value="">none</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header">
          <strong>Pricing details</strong>
        </div>
        <div class="card-body">
          <label for="price" class="form-control-label"
            >Price <span class="required-in">*</span></label
          >
          <div class="input-group">
            <input
              id="price"
              type="text"
              name="price"
              placeholder="Price"
              class="form-control"
            />
            <div class="input-group-append">
              <span class="input-group-text">$</span>
            </div>
          </div>
          <div class="form-group">
            <label for="amount" class="form-control-label"
              >Amount <span class="required-in">*</span></label
            >
            <input
              id="amount"
              type="number"
              name="amount"
              placeholder="Amount"
              class="form-control"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <strong>Description</strong>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-control-label">Description</label>
            <textarea
              id="description"
              name="description"
              class="form-control"
              rows="8"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <strong>Product Photos</strong>
          <span style="font-size: 12px">(Select multiple images)</span>
        </div>
        <div class="card-body">
          <div id="preview" class="row"></div>
          <input
            type="file"
            class="form-control"
            name="image[]"
            multiple
            accept="image/*"
          />
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <strong>Features</strong>
        </div>
        <div class="card-body"></div>
      </div>
    </div>
    <div class="col-lg-12 discount-wrapper">
      <div class="discount-badge">0 %</div>
      <div class="card">
        <div class="card-header">
          <strong>Discount details</strong>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-2">
              <div class="form-group">
                <label for="discount" class="form-control-label"
                  >Discount</label
                >
                <input
                  id="discount"
                  type="number"
                  name="discount"
                  class="form-control"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form-group">
                <label class="form-control-label">Discount start date</label>
                <input
                  type="text"
                  name="discount_start_date"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form-group">
                <label class="form-control-label">Discount end date</label>
                <input
                  type="text"
                  name="discount_end_date"
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <strong>Display options</strong>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group">
                <label for="featured" class="form-control-label"
                  >Is Featured Product</label
                >
                <select id="featured" name="featured" class="form-control">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  components: {},
  data() {
    return {}
  },
  computed: {
    product: {
      get() {
        return this.$store.state.product.product
      },
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style>
.required-in {
  color: red;
}

.calendar-view {
  top: -200px !important;
}

.photo_preview {
  width: 90px;
  height: 130px;
}

.discount-wrapper {
  position: relative;
}

.discount-badge {
  background: red;
  position: absolute;
  width: 88px;
  height: 34px;
  z-index: 9999;
  right: 17px;
  top: 9px;
  color: #fff;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
}

.photo-wrapper {
  text-align: center;
  border: 2px solid #ccc;
  margin: 8px;
}
</style>
