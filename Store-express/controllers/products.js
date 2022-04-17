const Product = require('../models/products');

const getAllProductsStatic = async (req, res) => {
  const search = 'a';
  const products = await Product.find({}).sort('name price').limit(5).skip(2);
  res.status(200).json({ products, nbHits: products.length });
};
 // מקבל את כל הנתונים מהמסמך
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  // מחפש את החברה
  if (company) {
    queryObject.company = company;
  }
   // מחפש את השם של המוצר
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
  // מתבצע REGEX 
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
  // איזה דף מגיע ה שאילתה
  const page = Number(req.query.page) || 1;
  // כמה נתונים נקבל בדף אחד 
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products });
};
// מוציא את הפונקציות שיהיה אפשר להשתמש בהם גם מחוץ לקונטרולר
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
