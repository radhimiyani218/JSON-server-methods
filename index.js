let id=-1
const productdata = (e) =>{
    e.preventDefault();
    let value=document.getElementById("btn").value
    console.log(value,id)
    let product = {
        img : document.getElementById("img").value,
        title : document.getElementById("title").value,
        price : document.getElementById("price").value,
        category : document.getElementById("category").value,

    }
    if(value=="post"){
        fetch(" http://localhost:3000/product",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(product),
    })
    }
    else{
        
        fetch(`http://localhost:3000/product/${id}`,{
        method:"PATCH",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(product),
    })
    }
}
document.querySelector("form").addEventListener("submit" ,productdata)


const display =(data)=>{
    console.log(data);
    data.map((product)=>{
        let div = document.createElement("div")
        let img = document.createElement("img")
        img.src=product.img
        let title = document.createElement("h2")
        title.innerHTML=product.title
        let price = document.createElement("h3")
        price.innerHTML=product.price
        let category = document.createElement("h3")
        category.innerHTML=product.category
        let btn1 = document.createElement("button")
        btn1.innerHTML="delete"
        btn1.addEventListener("click",()=>{
            fetch(`http://localhost:3000/product/${product.id}`,{
                method:"DELETE",
            
            })
        })
        let btn2 = document.createElement("button")
        btn2.innerHTML="update"
        btn2.addEventListener("click",()=>{
          document.getElementById("img").value=product.img
          document.getElementById("title").value=product.title
          document.getElementById("price").value=product.price
          document.getElementById("category").value=product.category
          id=product.id;
        
        })
       

        div.append(img,title,price,category,btn1,btn2);
        document.getElementById("ui").append(div)
    })
}
let get=async ()=>{
    let res=await fetch(" http://localhost:3000/product")
    let data=await res.json()

    display(data);
}
get();