const url = '/api/v1/products'
const fileFormDOM = document.querySelector('.file-form')

const nameInputDOM = document.getElementById('name')
const priceInputDOM = document.getElementById('price')
const imageInputDOM = document.getElementById('image')

const containerDOM = document.querySelector('.container')
let imageValue;

imageInputDOM.addEventListener('change', async (e) => {
    const imageFile = e.target.files[0]
    const formData = new FormData()
    formData.append('image', imageFile)

    try {
        const { data: { image: { src } } } = await axios.post(`${url}/uploads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        imageValue = src
    } catch (error) {
        imageValue = null
        console.log(error);
    }
})

fileFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nameValue = nameInputDOM.value
    const priceValue = priceInputDOM.value

    try {
        const product = { name: nameValue, price: priceValue, image: imageValue }
        await axios.post(url, product)
    } catch (error) {
        console.log(error);
    }
})

async function fetchProducts() {
    try {
        const { data: { products } } = await axios.get(url)

        const productsDOM = products.map((product) => {
            const { image, name, price } = product
            return (`
            <article class="product">
                <img src="${image}" alt="${name}" class="img" />
                <footer>
                    <p>${name}</p>
                    <span>${price}</span>
                </footer>
            </article>
            `)
        }).join("")
        containerDOM.innerHTML = productsDOM
    } catch (error) {
        console.log(error);
    }
}

fetchProducts()