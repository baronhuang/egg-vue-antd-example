/**
 * Created on 2019/3/8 0008
 * @author: ben0721@yeah.net
 * @desc: 产品列表的逻辑代码
 */

// mixin对象全部都会挂载到Vue的实例上，所以不用每次都import，直接用window.Global.Vue.$mixin来访问即可
const productPageList = window.Global.Vue.$mixin.pageList({ name: 'product' });
export default {
  name: 'productList',
  mixins: [productPageList],
  data () {
    return {
      // 必须要这么声明才有效果
      productForm: this.$form.createForm(this),
      isShowProductModal: false,
      productModalLoading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
  },
  methods: {
    /**
     * 打开编辑弹窗
     * @param item
     */
    showProductModal (item = {}) {
      this.isShowProductModal = true;
      this.$nextTick(() => {
        let fields = Object.assign({}, item);
        // 删除多余字段，不然会报错
        delete fields.updated_at;
        delete fields.created_at;
        delete fields.__v;
        this.productForm.setFieldsValue(fields);
      });
    },
    /**
     * 重写mixin里面的方法
     */
    async getProductData () {
      let res = await this.$api.product.getProductList({ pageNum: this.productPagination.current, pageSize: this.productPagination.pageSize });
      return res;
    },
    close () {
      this.isShowProductModal = false;
      this.productForm.resetFields();
    },
    /**
     * 点击确定
     */
    productModalOk () {
      // 触发表单验证
      this.productForm.validateFields(async (err, values) => {
        // 验证表单没错误
        if (!err) {
          this.productModalLoading = true;
          let res;
          // 有_id则是更新
          if (values._id) {
            res = await this.$api.product.updateProduct(values);
          } else {
            res = await this.$api.product.createProduct(values);
          }
          this.productModalLoading = false;
          if (res.code === 200) {
            this.$message.success('保存成功');
            this.getProductList();
            this.close();
          }
        }
      });
    },
    productModalCancel () {
      this.close();
    },
    async deleteProductOk (item) {
      let res = await this.$api.product.deleteProduct(item);
      if (res.code === 200) {
        this.$message.success('删除成功');
        this.getProductList();
      }
    }
  },
  async created () {
    this.getProductList();
  }
};
