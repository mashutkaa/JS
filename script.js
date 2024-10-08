let arrayOfProducts = [
    { name: "Canvas aida №16", color: "white", price: 3000, category: "Embroidery", availability: "available"},
    { name: "Embroidery Thread Set", color: "red", price: 1500, category: "Embroidery", availability: "available"},
    { name: "Sewing Needles Set", color: "silver", price: 500, category: "Sewing", availability: "unavailable" },
    { name: "Knitting Yarn Bundle", color: "blue", price: 1200, category: "Knitting", availability: "available" },
    { name: "Knitting Needles", color: "gray", price: 800, category: "Knitting", availability: "available" },
    { name: "Muline Threads Pack", color: "green", price: 1800, category: "Embroidery", availability: "unavailable" },
    { name: "Sewing Scissors", color: "black", price: 900, category: "Sewing", availability: "unavailable" },
    { name: "Knitting Pattern Book", color: "yellow", price: 1100, category: "Knitting", availability: "unavailable" },
    { name: "Embroidery Floss", color: "purple", price: 1300, category: "Embroidery", availability: "available" },
    { name: "Sewing Machine Needles", color: "gold", price: 700, category: "Sewing", availability: "unavailable" },
    { name: "Cotton Yarn", color: "white", price: 1600, category: "Knitting", availability: "available" },
];

let additionalProducts = [
    { name: "Cross Stitch Kit", color: "beige", price: 2100, category: "Embroidery", availability: "available"},
    { name: "Knitting Wool Set", color: "pink", price: 1400, category: "Knitting", availability: "available" },
    { name: "Sewing Threads Set", color: "brown", price: 1700, category: "Sewing", availability: "available" },
    { name: "Embroidery Hoops", color: "natural", price: 600, category: "Embroidery", availability: "available" },
    { name: "Knitting Hooks", color: "white", price: 1000, category: "Knitting", availability: "available" },
    { name: "Sewing Tape Measure", color: "yellow", price: 400, category: "Sewing", availability: "available" },
    { name: "Embroidery Frame", color: "silver", price: 1900, category: "Embroidery", availability: "unavailable" },
    { name: "Knitting Needles Bamboo", color: "brown", price: 900, category: "Knitting", availability: "available" },
    { name: "Sewing Box", color: "red", price: 2200, category: "Sewing", availability: "available" },
    { name: "Embroidery Kit Floral", color: "blue", price: 2500, category: "Embroidery", availability: "unavailable" },
    { name: "Knitting Wool Merino", color: "green", price: 2000, category: "Knitting", availability: "available" },
    { name: "Sewing Machine", color: "white", price: 15000, category: "Sewing", availability: "available" },
    { name: "Embroidery Needle Set", color: "black", price: 800, category: "Embroidery", availability: "available" },
    { name: "Knitting Loom", color: "purple", price: 1700, category: "Knitting", availability: "unavailable" },
    { name: "Sewing Thread Bobbins", color: "green", price: 1200, category: "Sewing", availability: "available" },
    { name: "Embroidery Floss Pack", color: "yellow", price: 1300, category: "Embroidery", availability: "available" },
    { name: "Knitting Pattern Templates", color: "white", price: 900, category: "Knitting", availability: "unavailable" },
    { name: "Sewing Ruler Set", color: "blue", price: 1000, category: "Sewing", availability: "available" },
    { name: "Embroidery Kit Animals", color: "pink", price: 2600, category: "Embroidery", availability: "available" },
];

// перелік товарів 

let filteredArray = [...arrayOfProducts];

function printProducts(arr){
    const products = document.querySelector('.row');

    products.innerHTML = '';

    arr.forEach(property => {
        products.innerHTML += `
            <tr>
                <td>${property.name}</td>
                <td>${property.color}</td>
                <td>${property.price}</td>
                <td>${property.category}</td>
                <td>${property.availability}</td>
            </tr>
        `;
    });
}

printProducts(filteredArray);

// фільтрація (колір, категорія)

const filterIcon = document.querySelector('.bx-filter-alt');
const filterDiv = document.querySelector('.filter');

filterIcon.addEventListener('click', () => {
    filterDiv.classList.toggle('open');
});

function filterProducts(arr, prop, value) {
    let result = [];

    for (let item of arr) {
        if (prop === 'color' || prop === 'category') {
            if (String(item[prop]).toLowerCase().includes(value.toLowerCase())) {
                result.push(item);
            }
        } 
        
        else if (prop === 'availability') {я
            if (item[prop] === value) {
                result.push(item);
            }
        }
    }

    return result;
}

function render(arr) {
    const colorValue = document.getElementById("input-color").value;
    const categoryValue = document.getElementById("input-category").value;
    const availabilityValue = document.querySelector('input[name="availability"]:checked').id;

    let newArray = [...arr];

    if (colorValue !== '') {
        newArray = filterProducts(newArray, "color", colorValue);
    }

    if (categoryValue !== '') {
        newArray = filterProducts(newArray, "category", categoryValue);
    }

    if (availabilityValue === "check-available") {
        newArray = filterProducts(newArray, "availability", "available");
    } else if (availabilityValue === "check-unavailable") {
        newArray = filterProducts(newArray, "availability", "unavailable");
    }

    return newArray;
}

document.getElementById('filter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    filteredArray = render(arrayOfProducts);
    printProducts(filteredArray);
});

// сортування (за ціною)

const sortIconUp = document.querySelector('.bx-sort-up');
const sortIconDown = document.querySelector('.bx-sort-down');

function sortProducts(arr, prop, dir) {
    let result = arr.sort(function(a, b) {
        if (a[prop] < b[prop]) {
            return dir ? 1 : -1;
        }
        if (a[prop] > b[prop]) {
            return dir ? -1 : 1;
        }
        return 0;
    });

    return result;
}

sortIconUp.addEventListener('click', () => {
    const sortedArray = sortProducts(filteredArray, "price", true);
    printProducts(sortedArray);
});

sortIconDown.addEventListener('click', () => {
    const sortedArray = sortProducts(filteredArray, "price", false);
    printProducts(sortedArray);
});

// додавання додаткових товарів

const stopButton = document.createElement('button');
stopButton.textContent = 'Не додавати товари';
document.body.append(stopButton);

let currentIndex = 0;

function addAdditionalProducts() {
    const intervalId = setInterval(() => {
        if (currentIndex < additionalProducts.length) {
            const product = additionalProducts[currentIndex];
            filteredArray.push(product); 

            const products = document.querySelector('.row');
            products.innerHTML += `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.color}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>${product.availability}</td>
                </tr>
            `;

            currentIndex++;
        } else {
            clearInterval(intervalId);
        }
    }, 3000);

    stopButton.addEventListener('click', () => {
        clearInterval(intervalId);
    }); 
}

addAdditionalProducts();