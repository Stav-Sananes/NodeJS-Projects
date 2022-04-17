const Product = require('../models/products');

const getAllProductsStatic = async (req, res) => {
  const search = 'a';
  const products = await Product.find({}).sort('name price').limit(5).skip(2);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = name;
  }

  console.log(queryObject);
  let result = await Product.find(queryObject);

  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result = rsult.select(fieldList);
  }
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createAt');
  }
  const operatorMap = {
    '>' : '$gt',
     '>=' : '$gte',
     '=' : '$eq',
     '<' : '$lt',
     '<=' : '$lte',
  }
  const regEx = /\b(<|>|>=|=|<|<=)\b/g
  let filters = nummericFilter.replace(regEx,(match) =>`-${operatorMap[match]}-`)
  const options = ['price','rating'];
  filters = filters.split(',').forEach((item)=>{
  const [field,operator,value] = item.split('-')
  if(options.includes(field){
     queryObject[field] = {[operator]:Number(value)}
  })
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
