const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    displayPhone(data.data)

}

const displayPhone = (phones) => {

    const cardSection =document.getElementById('card-section') 
     

    cardSection.innerHTML =''
    phones.forEach(phone => {
        
        const div = document.createElement('div')
        div.classList = 'card p-4 bg-gray-100 shadow-xl'
        div.innerHTML = ` 
        <figure>
        <img src="${phone.image} " alt="Shoes" />
        </figure>
        <div class="card-body"></div>
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>Click Details  button for more phone</p>
          <div class="card-actions justify-center">
              <button  onClick='showDetailsModal("${phone.slug}")' class="btn my-2  btn-primary">Details</button>
          </div>
        `
       
        cardSection.appendChild(div)
    });
      
handleSearch(false)
}
const showDetailsModal= async(id)=>{
      const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
     const data = await res.json()
     const div = document.getElementById('details-card')
     div.innerHTML=` 
     <img class="mx-auto" src='${data.data.image}'/>
     <h3 class="font-bold text-lg">${data.data.name}</h3>
     <p class=""><span class="font-semibold text-lg">Release Date : </span>${data.data.releaseDate}</p>
     <p class=""><span class="font-semibold text-lg">Display : </span>${data.data.mainFeatures.displaySize}</p>
     <p class=""><span class="font-semibold text-lg">ChipSet : </span>${data.data.mainFeatures.chipSet}</p>
     <p class=""><span class="font-semibold text-lg">Memory : </span>${data.data.mainFeatures.memory}</p>
     <p class=""><span class="font-semibold text-lg">sensor : </span>${data.data.mainFeatures.sensors}</p>
     
     `
     



     show_details_modal.showModal()
}


const handleSearch=(isLoading) => {
   const loadingSection= document.getElementById('loading-section')
    if(isLoading){
        loadingSection.classList.remove('hidden')
    } else{
        loadingSection.classList.add('hidden')
    }
}

const searchBtn =()=> {
    const searchText = document.getElementById('search-text').value
    loadPhone(searchText)
    handleSearch(true)
}





loadPhone()