import {catsData} from '../js/data.js'

const emotionRadios = document.querySelector('#emotion-radios')
const getImageBtn = document.querySelector('#get-image-btn')
const gifsOnlyOption = document.querySelector('#gifs-only-option')

emotionRadios.addEventListener('change', highlightCheckedOption)
getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')

    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    
    document.getElementById(e.target.id).parentElement.classList.add('highlight')

}



function getMatchingCatsArray(e){

    if (document.querySelector('input[type="radio"]:checked')){
        const selectedCat = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        const matchingCatEmotion = catsData.filter(function(cat){
            if(isGif){
                return cat.isGif && cat.emotionTags.includes(selectedCat)
            }else{
                return cat.emotionTags.includes(selectedCat)
            }
        })
       return matchingCatEmotion
    }
    
}


function getSingleCat(){
   const catsArray = getMatchingCatsArray()
   if(catsArray.length === 1){
    return catsArray[0]
   }else{
    const randomNumber = Math.floor(Math.random() * catsArray.length)
    return catsArray[randomNumber]
}
}
function renderCat(){
    const cat = getSingleCat()
    //modal appears here
    const memeModal = document.querySelector('#meme-modal')
    memeModal.style.display = 'flex'
    //introducing cat meme to the modal
    const memeModalInner = document.querySelector('#meme-modal-inner')
    memeModalInner.innerHTML = `<img class="cat-img" src="images/${cat.image}" alt="${cat.alt}">`
    //button to close the modal
    const memeModalCloseBtn = document.querySelector('#meme-modal-close-btn')
    memeModalCloseBtn.addEventListener('click', function(){
        memeModal.style.display = 'none'
    })
}



function getEmotionsArray(cats){
    const emotionsArray = []

    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            
            if(!emotionsArray.includes(emotion)){
              emotionsArray.push(emotion)  
            }
            
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    let radioItems = []
    const emotions = getEmotionsArray(cats)
    for(let emotion of emotions){
        radioItems += `
            <div class='radio'>
                <label for='${emotion}'>${emotion}</label>
                <input
                    type='radio'
                    id='${emotion}'
                    value='${emotion}'
                    name='emotion'
                >
            </div>
            `
    }
        emotionRadios.innerHTML = radioItems
    
   
    
}

renderEmotionsRadios(catsData)
