<template>
  <!-- eslint-disable vue/no-v-html  -->
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
              :value="this.product.title"
              @change="updateField($event)"
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
              :value="this.product.category_id"
              @change="updateField($event)"
              v-html="this.$store.state.category.categoryHtmlTree"
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
              :value="this.product.product_code"
              @change="updateField($event)"
            />
          </div>
          <div class="form-group">
            <label for="brand_id" class="form-control-label">Brand </label>
            <select
              id="brand_id"
              name="brand_id"
              class="form-control"
              :value="this.product.brand_id"
              @change="updateField($event)"
            >
              <option value="">none</option>
              <option
                v-for="brand in this.$store.state.brand.allBrands"
                :key="brand.id"
                :value="brand.id"
              >
                {{ brand.title }}
              </option>
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
              :value="this.product.price"
              @change="updateField($event)"
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
              :value="this.product.amount"
              @change="updateField($event)"
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
            <quillEditor
              class="quill-editor"
              :value="this.product.description"
              :options="editorOption"
              @change="updateTextAreaContent($event)"
            ></quillEditor>
            <!-- <textarea id="description" name="description" class="form-control" rows="8" :value="this.product.description" @change="updateField($event)"></textarea>-->
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
          <div id="preview" class="row">
            <div
              v-for="(preview, index) of this.$store.state.product
                .files_preview"
              :key="index"
              class="col-lg-3 photo-wrapper"
            >
              <img :src="preview" class="photo_preview" />
            </div>
          </div>
          <input
            type="file"
            class="form-control"
            name="image[]"
            multiple
            accept="image/*"
            @change="handlePhotos"
          />

          <div v-if="this.$store.state.product.gallery.length" class="row">
            <div
              v-for="(record, index) of this.$store.state.product.gallery"
              :key="index"
              class="col-lg-3"
            >
              <img :src="record.image_url.small" class="photo_preview" />
              <a
                href="#"
                class="btn btn-danger"
                title="remove"
                @click.prevent="removeImage(record.id)"
                ><i class="fa fa-remove"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <strong>Features</strong>
        </div>
        <div class="card-body">
          <div v-if="this.$store.state.product.features.length">
            <div
              v-for="feature in this.$store.state.product.features"
              :key="feature"
              class="form-group"
            >
              <label class="form-control-label">{{
                feature.field_title
              }}</label>
              <input
                :type="feature.field_type === 1 ? 'text' : 'color'"
                :name="'feature[' + feature.field_id + ']'"
                placeholder=""
                class="form-control"
                :value="feature.field_value"
                @change="updateFeatureValue($event, feature.field_id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12 discount-wrapper">
      <div v-if="this.product.discount > 0" class="discount-badge">
        {{ this.product.discount }} %
      </div>
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
                  :value="this.product.discount"
                  @change="updateField($event)"
                />
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form-group">
                <label class="form-control-label">Discount start date</label>
                <Datepicker
                  name="discount_start_date"
                  format="yyyy-MM-dd"
                  input-class="form-control"
                  :clear-button="true"
                  calendar-class="calendar-view"
                  :bootstrap-styling="true"
                  clear-button-icon="fa fa-remove"
                  :value="this.product.discount_start_date"
                  @input="updateStartDateField"
                  @selected="updateStartDateField"
                ></Datepicker>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="form-group">
                <label class="form-control-label">Discount end date</label>
                <Datepicker
                  name="discount_end_date"
                  format="yyyy-MM-dd"
                  input-class="form-control"
                  :clear-button="true"
                  calendar-class="calendar-view"
                  :bootstrap-styling="true"
                  clear-button-icon="fa fa-remove"
                  :value="this.product.discount_end_date"
                  @input="updateEndDateField"
                  @selected="updateEndDateField"
                ></Datepicker>
              </div>
            </div>

            <div
              v-if="
                product.price !== '' &&
                product.discount !== '' &&
                product.discount > 0
              "
              class="col-lg-12 text-center"
            >
              <p>
                Original price: <del>{{ product.price }}</del>
              </p>
              <p>
                Price after discount:
                <strong>{{ this.getPriceWithDiscount() }}</strong>
              </p>
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
                <select
                  id="featured"
                  name="featured"
                  class="form-control"
                  :value="this.product.featured"
                  @change="updateField($event)"
                >
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
/* eslint-disable array-callback-return */

import Datepicker from 'vuejs-datepicker'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'ProductForm',
  components: {
    Datepicker,
    quillEditor,
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ],
        },
      },
    }
  },
  computed: {
    product: {
      get() {
        return this.$store.state.product.product
      },
    },
  },
  methods: {
    updateField(e) {
      this.$store.commit('product/setProduct', {
        key: e.target.name,
        value: e.target.value,
      })

      if (e.target.name === 'category_id') {
        this.$store.dispatch('category/showCategory', e.target.value)

        this.$store.commit('product/resetFeatures')

        setTimeout(() => {
          if (this.$store.state.category.features.length) {
            const features = [...this.$store.state.category.features]

            features.map((feature) => {
              this.$store.commit('product/appendToFeatures', {
                field_id: feature.id,
                field_title: feature.field_title,
                field_type: feature.field_type,
                field_value: '',
              })
            })
          }
        }, 300)
      }
    },
    updateTextAreaContent(event) {
      this.$store.commit('product/setProduct', {
        key: 'description',
        value: event.html,
      })
    },
    updateStartDateField(date) {
      if (date) {
        this.$store.commit('product/setProduct', {
          key: 'discount_start_date',
          value: date.toLocaleDateString('en-US'),
        })
      } else {
        this.$store.commit('product/setProduct', {
          key: 'discount_start_date',
          value: '',
        })
      }
    },
    updateEndDateField(date) {
      if (date) {
        this.$store.commit('product/setProduct', {
          key: 'discount_end_date',
          value: date.toLocaleDateString('en-US'),
        })
      } else {
        this.$store.commit('product/setProduct', {
          key: 'discount_end_date',
          value: '',
        })
      }
    },
    handlePhotos(event) {
      this.$store.commit('product/setFiles', event.target.files)

      this.previewPhotos()
    },
    previewPhotos() {
      this.$store.commit('product/clearFilesPreview')

      this.$store.state.product.files.map((file) => {
        const self = this
        const reader = new FileReader()
        reader.onload = function (e) {
          self.$store.commit('product/appendFilesPreview', e.target.result)
        }
        reader.readAsDataURL(file)
      })
    },
    updateFeatureValue(event, id) {
      this.$store.commit('product/updateFeatureValue', {
        id,
        value: event.target.value,
      })
    },
    getPriceWithDiscount() {
      return (
        this.product.price - this.product.price * (this.product.discount / 100)
      )
    },
    removeImage(id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('product/removeImage', id)
      }
    },
  },
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
