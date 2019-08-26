'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const CsvtoJson=require('csvtojson')


const app = express();
const port = 1995;
const model=require('./models/modeluser')

// Fake database
const userDatabase = [
  {
    email: "jennifer@gmail.com",
    name: 'jenifer',
    password: "1234jenifer"
  },
  {
    email: "bram@gmail.com",
    name: 'bravo',
    password: "1bravo"
  },
  {
    email: "tom@gmail.com",
    name: 'tom',
    password: "1234jenitom"
  },
  {
    email: "maximillian@gmail.com",
    name: 'max',
    password: "1234jenifer"
  },
  {
    email: "tomo@gmail.com",
    name: 'tom',
    password: "1234jenifer"
  },
  {
    email: "marooke@gmail.com",
    name: 'mar',
    password: "1234jenifer"
  }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Task 1.1 Pagination
 * Create a pagination handler for userDatabase resource.
 * sortMethtod : value (desc, asc) default sorting method.
 * sortAttribute : value (email, name) from which attributes resources will be sorted
 * limit : number of resource instance that will be shown on response
 * page : current page number.
 */
app.get('/users', (req, res) => {
  const { page, limit, sortMethod, sortAttribute } = req.query; 
  if( !limit && !page && !sortMethod && !sortAttribute){
    // if all query undefined will return to default database
    return res.json(userDatabase)
  }
  if(sortMethod==='desc'){
    userDatabase.sort((a,b)=>(a[sortAttribute]>b[sortAttribute])).reverse()
  }else if(sortMethod==='asc'){
    userDatabase.sort((a,b)=>(a[sortAttribute]>b[sortAttribute]))
  }
  if(page==0){
    let newarr=[]
    for (let i =0 ; i < limit; i++) {
      if(userDatabase[i]){
        newarr.push(userDatabase[i])      
        
      }
    }
    return res.json(newarr)
  }
  var dataperpage=(limit*page)-limit
  let newarr=[]
  for (let i =0 ; i < limit; i++) {
    if(userDatabase[dataperpage+i]){
      newarr.push(userDatabase[dataperpage+i])
    }
    
  }
  
  return res.json(newarr);
  
});

// An example of a handler with simple input validation.
app.get('/users/:id', (req, res) => {
  let { id } = req.params;

  // Input validation
  if (id <= 0 || !parseInt(id, 10) || isNaN(id) || id > userDatabase.length) {
    res.status(500);
    return res.json({
      error: {
        code: 500,
        message: 'Could not find user',
      }
    });
  }
  
  id = id - 1;
  return res.json(userDatabase[id]);
});

/**
 * Task 1.2 Create a new user
 * Create a new user and save it into userDatabase.
 */
app.post('/users', (req, res) => {
  const {name,email,password}=req.body

  if(!name || !password || !email){
    res.status(500);
    return res.json({
      error: {
        code: 500,
        message: 'must fill all form',
      }
    });
  }
  let data={
    name,email,password
  }
  userDatabase.push(data)
  // return to show database
  return res.status(500).send({userDatabase,message:"success add data to database"});
});

/**
 * Task 1.3 Bulk Upload
 * Parse provided csv file and save all the data into userDatabase.
 */
app.post('/users/csv', (req, res) => {
  CsvtoJson().fromFile("./users.csv")
  .then(source=>{
    // i can use this code if database using "var" or "let"
    // var newarr=[...userDatabase,...source]
    // return res.status(200).send({message:'berhasil',newarr});
    // but if using const i will for and choose
    source.forEach((item)=>{
      userDatabase.push(item)
    })
    return res.status(200).send({message:'berhasil',userDatabase});
  })
});

/**
 * Task 1.4 Idempotent User Edit
 * Based on HTTP requirements the put must be IDEMPOTENT, create an idempotent
 * handler to serve user editting.
 */
app.put('/users/:id', (req, res) => {
  // the id base on index of array
  const {id}=req.params
  const {name,email}=req.body
  // use if for avoid undefined data added to database
  if(name){
    userDatabase[id].name=name
  }
  if(email){
    userDatabase[id].email=email
  }

  return res.send({message:'suksess',userDatabase});
});

/**
 * Task 1.5 Patch Method
 * Create handler for change password handler
 */
app.patch('/users/:id/changepassword', (req, res) => {
  // the id base on index of array
  const {id}=req.params
  const {password}=req.body
  if(password){
    userDatabase[id].password=password
    return res.send({message:'suksess patch',userDatabase});
  }
  return res.status(500).send({message:'error'})
});

/**
 * Task 1.6 Delete Method
 * Create handler for deleting and entry
 */
app.delete('/users/:id', (req, res) => {
  // id base on index of array userdatabase
  const {id}=req.params
  userDatabase.splice(id,1)
  return res.send({message:'suksess delete',userDatabase});
});

/**
 * Task 1.7 Plain JS Bubble Sort
 * Create a handler to sort resources only by using pure javascript, without assistance
 * of third party lib for bubble sorting algorithm.
 */
app.get('/users/sort/bubble', (req, res) => {
  const { sortAttribute, sortMethod } = req.query;
  if(sortMethod==='desc'){
    for(let i=userDatabase.length-1;i>0;i--){
      for(let j=0;j<i;j++){
        if(userDatabase[j][sortAttribute]<userDatabase[j+1][sortAttribute]){
          // save and reassaign array if rsmller than the next value in index
          const temp=userDatabase[j]
          userDatabase[j]=userDatabase[j+1]
          userDatabase[j+1]=temp
        }
      }
    }
  }else{
    // default ascen
    for(let i=userDatabase.length-1;i>0;i--){
      for(let j=0;j<i;j++){
        if(userDatabase[j][sortAttribute]>userDatabase[j+1][sortAttribute]){
          // save and reassaign array if bigger than the next value in index
          const temp=userDatabase[j]
          userDatabase[j]=userDatabase[j+1]
          userDatabase[j+1]=temp
        }
      }
    }
    
  } 
  return res.send(userDatabase);
});

/**
 * Task 1.8 Plain JS Divide Conquer
 * Create a handler to sort resources only by using pure javascript, without assistance
 * of third party lib for Divide Conquer sorting algorithm.
 */
// not finished in this number i'm totatally confuse confuse :D
app.get('/users/sort/divide', (req, res) => {
  const { sortAttribute, sortMethod } = req.query;
  console.log(sortAttribute)
  console.log(userDatabase[0][sortAttribute])
  var sorteddatabase=mergeSort(userDatabase,sortAttribute)
  res.status(200).send(sorteddatabase)
});
// for these function i just saw it in google too many bug i dont know how to implement this hhehe
// function mergeSort (unsortedArray,sortAttribute,sortMethod) {
//   // No need to sort the array if the array only has one element or empty
//   if (unsortedArray.length <= 1) {
//     return unsortedArray;
//   }
//   // In order to divide the array in half, we need to figure out the middle
//   const middle = Math.floor(unsortedArray.length / 2);

//   // This is where we will be dividing the array into left and right
//   const left = unsortedArray.slice(0, middle);
//   const right = unsortedArray.slice(middle);

//   // Using recursion to combine the left and right
//   return merge(
//     mergeSort(left), mergeSort(right),sortAttribute,sortMethod
//   );
// }
// function merge (left, right,sortAttribute,sortMethod) {
//   let resultArray = [], leftIndex = 0, rightIndex = 0;

//   // We will concatenate values into the resultArray in order
//   if(sortMethod=='asc'){
//     while (leftIndex < left.length && rightIndex < right.length) {
//       if (left[leftIndex].name < right[rightIndex].name) {
//         resultArray.push(left[leftIndex]);
//         leftIndex++; // move left array cursor
//       } else {
//         resultArray.push(right[rightIndex]);
//         rightIndex++; // move right array cursor
//       }
//     }
//   }else{
//     while (leftIndex < left.length && rightIndex < right.length) {
//       if (left[leftIndex].name > right[rightIndex].name) {
//         resultArray.push(left[leftIndex]);
//         leftIndex++; // move left array cursor
//       } else {
//         resultArray.push(right[rightIndex]);
//         rightIndex++; // move right array cursor
//       }
//     }
//   }

//   // We need to concat here because there will be one element remaining
//   // from either left OR the right
//   return resultArray
//           .concat(left.slice(leftIndex))
//           .concat(right.slice(rightIndex));
// }
// console.log(mergeSort(userDatabase,'name','asc'))
/**
 * Task 2.0
 * Recreating Handlers Using Postgres
 * Clone this project and do these tasks below:
 * - Create a seeder from userDatabase object and save it into Postgres.
 * - Recreate all the handlers and use sequelize to sort, save, edit etc (except for task 1.7 and 1.8) 
 */
const {postdata,updatedata,updatepassword,deletedata}=require('./controllers/controoler_users')

// start task 2.0 all url added by seq to  make debugging more easier
// actually this is my firsttime using sequelize i am sorry there is unefective code
// 2.1 pagination
app.get('/usersseq',(req,res)=>{
  const { page, limit, sortMethod, sortAttribute } = req.query;
  if( !limit && !page && !sortMethod && !sortAttribute){
    // if all query undefined will return to default database
    model.findAll().then(users=>{
      return res.send(users)

    }).catch((err)=>{
      console.log(err)
    })
  }else{
    // if pagenya 0 tidak ada limitnya atau tampilkan seluruh data
    if (page==0){
      model.findAll({order:[[sortAttribute,sortMethod]]}).then(users=>{
       return res.json(users)
      }).catch((err)=>{
       console.log('masuk err')
       return res.json(err)
      })
  
    }else{
      var offset=(page*limit)-limit
      model.findAll({limit:limit,order:[[sortAttribute,sortMethod]],offset:offset}).then(users=>{
        return res.json(users)
      }).catch((err)=>{
       console.log('masuk err')
       return res.json(err)
      })
    }

  } 

})
// 2.2 add data post data dari file controller
app.post('/postusersseq',postdata)
// 2.3 add csv data
app.post('/postuserscsvseq',(req,res)=>{
  CsvtoJson().fromFile("./users.csv")
  .then(source=>{
    model.bulkCreate(source).then(data=>{
      res.json(data)
    }).catch((err)=>{
      console.log('masuk eroor csv')
      res.json(err)
    })
  })
})
// 2.4 edit atau update data csv data
app.put('/usersseq/:id',updatedata)
// 2.5 edit password
app.patch('/usersseq/:id/changepassword',updatepassword)
// 2.6 delete data
app.delete('/usersseq/:id',deletedata)





// Not found handler
app.use('*', (req, res) => {
  res.status(404);
  
  res.json({
    error: {
      code: 404,
      message: 'Could not find any associated resource'
    }
  })
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: {
      code: 500,
      message: err.message || 'Server Error'
    }
  });
});


app.listen(port, () => console.log(`App is running on port, ${port}`));