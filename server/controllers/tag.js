// import models
const { tag: TagModel, category: CategoryModel, sequelize } = require('../models')

class TagController {
  static async getTagList(ctx) {
    const data = await TagModel.findAll({
      attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
      group: 'id',
      where: {
        articleId: { $not: null }
      },
      order: ['id', [sequelize.fn('COUNT', sequelize.col('name')), 'desc']]
    })
    ctx.body = data
  }

  static async getCategoryList(ctx) {
    const data = await CategoryModel.findAll({
      attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
      group: 'id',
      where: {
        articleId: { $not: null }
      },
      order: ['id', [sequelize.fn('COUNT', sequelize.col('name')), 'desc']]
    })
    ctx.body = data
  }

  static async updateTagById(ctx) {
    const { tagName, tagId } = ctx.request.body
    console.log('ctx-----', ctx)
    const data = await TagModel.update({ name: tagName }, { where: { id: tagId } })
    ctx.body = { message: 'success', data }
  }

  static async updateCategoryById(ctx) {
    const { categoryName, categoryId } = ctx.request.body
    console.log('ctx-----', ctx)
    const data = await CategoryModel.update({ name: categoryName }, { where: { id: categoryId } })
    ctx.body = { message: 'success', data }
  }
}

module.exports = TagController
