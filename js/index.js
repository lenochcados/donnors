class Donor {
  constructor(params) {
    this.number = params.number
    this.zodiac_sign = params.zodiac_sign
    this.height = params.height
    this.weight = params.weight
    this.skin_color = params.skin_color
    this.blood_type = params.blood_type
    this.hair_color = params.hair_color
    this.nationality = params.nationality
    this.eye_color = params.eye_color
    this.rhesus = params.rhesus
    this.gender = params.gender
    this.photo = params.photo
  }
}

class Filter {
  field = null;
  constructor(field) {
    this.field = field;
  }
}

class RangeFilter extends Filter {
  from = -Infinity;
  to = Infinity;
  constructor(from, to, field) {
    super(field);
    this.from = from;
    this.to = to;
  }
  isSet() {
    return this.from && this.to;
  }
  check(value) {
    return value >= this.from && value <= this.to;
  }
}

class CheckboxFilter extends Filter {
  values = [];
  constructor(values, field) {
    super(field);
    this.values = values;
  }
  isSet() {
    return this.values.length;
  }
  check(value) {
    return this.values.includes(value);
  }
  onCheckboxChangeClosure() {
    const scope = this;
    return function (data, event) {
      valuesIdentity(scope.values, event.target.checked, data);
    }
  }
}

class RadioFilter extends CheckboxFilter {
  onRadioChangeClosure() {
    const scope = this;
    return function (data, event) {
      valuesIdentity(scope.values, event.target.checked, event.target.name);
    }
  }
}

class SelectFilter extends Filter {
  value = '';
  constructor(value, field) {
    super(field);
    this.value = value;
  }
  isSet() {
    return this.value;
  }
  check(value) {
    return this.value === value;
  }
}

function valuesIdentity(values, isPush, value) {
  const index = values.indexOf(value);
  if (isPush && index === -1) {
    values.push(value);
  } else if (!isPush && index !== -1) {
    values.splice(index, 1)
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let select_gender = ko.observable('')

let filt = ko.observable(false);

function check(checkboxElem) {
  let keyObj = checkboxElem.value
  let textContent = checkboxElem.nextElementSibling.textContent
  textContent = (keyObj === 'rhesus' && textContent === "Положительный") ? '+' : '-'
  if (checkboxElem.checked && !filt_func.filt_data[keyObj].includes(textContent)) {
    filt_func.filt_data[keyObj].push(textContent);
  }
  if (!checkboxElem.checked && filt_func.filt_data[keyObj].includes(textContent)) {
    let index = filt_func.filt_data[keyObj].indexOf(textContent, 0);
    if (index != -1) {
      filt_func.filt_data[keyObj].splice(index, 1)
    }
  }
}

const fields = {
  photo_men: ['/donor_photos/men/1.jpeg', '/donor_photos/men/12.jpeg', '/donor_photos/men/17.jpeg', '/donor_photos/men/2.jpg', '/donor_photos/men/3.jpg', '/donor_photos/men/4.jpg', '/donor_photos/men/5.jpg', '/donor_photos/men/6.jpg', '/donor_photos/men/7.jpg', '/donor_photos/men/8.jpg', '/donor_photos/men/9.jpg', '/donor_photos/men/10.jpg', '/donor_photos/men/11.jpg', '/donor_photos/men/13.jpg', '/donor_photos/men/15.jpg', '/donor_photos/men/16.jpg', '/donor_photos/men/18.jpg', '/donor_photos/men/19.jpg', '/donor_photos/men/20.jpg', '/donor_photos/men/21.jpg', '/donor_photos/men/22.jpg', '/donor_photos/men/23.jpg', '/donor_photos/men/24.jpg', '/donor_photos/men/25.jpg', '/donor_photos/men/26.jpg', '/donor_photos/men/27.jpg', '/donor_photos/men/28.jpg', '/donor_photos/men/29.jpg', '/donor_photos/men/30.jpg', '/donor_photos/men/31.jpg', '/donor_photos/men/32.jpg', '/donor_photos/men/33.jpg',],
  photo_women: ['/donor_photos/women/1.jpg', '/donor_photos/women/2.jpg', '/donor_photos/women/3.jpg','/donor_photos/women/4.jpg', '/donor_photos/women/5.jpg', '/donor_photos/women/6.png', '/donor_photos/women/7.jpg', '/donor_photos/women/8.jpg','/donor_photos/women/9.jpg','/donor_photos/women/10.jpg','/donor_photos/women/12.jpg','/donor_photos/women/13.jpg','/donor_photos/women/14.jpg','/donor_photos/women/15.jpg','/donor_photos/women/16.jpg','/donor_photos/women/17.jpg','/donor_photos/women/18.jpg','/donor_photos/women/19.jpg','/donor_photos/women/20.jpg', ,'/donor_photos/women/21.jpg','/donor_photos/women/22.jpg','/donor_photos/women/23.jpg','/donor_photos/women/24.jpg', ,'/donor_photos/women/25.jpg','/donor_photos/women/26.jpg','/donor_photos/women/27.jpg','/donor_photos/women/28.jpg', ,'/donor_photos/women/29.jpg','/donor_photos/women/30.jpg','/donor_photos/women/31.jpg','/donor_photos/women/32.jpg', ,'/donor_photos/women/33.jpg'],
  skin_colors: ['Светлая', 'Смуглая'],
  hair_colors: ['Русые', 'Темные', 'Светлые', 'Рыжие'],
  eye_colors: ['Голубые', 'Зеленые', 'Серые', 'Карие', 'Черные'],
  nationalities: ['Русский', 'Башкир', 'Татарин', 'Метис'],
  zodiac_signs: ['Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец', 'Козерог', 'Водолей', 'Рыбы'],
  blood_types: ['I', 'II', 'III', 'IV'],
  rh_factors: ['+', '-'],
  genders: ['men', 'women'],
}


function generateDonnors(n) {
  const result = [];
  for (i = 0; i < n; i++) {
    const skin_color = fields.skin_colors[getRandomInt(0, fields.skin_colors.length)]
    const hair_color = fields.hair_colors[getRandomInt(0, fields.hair_colors.length)]
    const eye_color = fields.eye_colors[getRandomInt(0, fields.eye_colors.length)]
    const nationality = fields.nationalities[getRandomInt(0, fields.nationalities.length)]
    const zodiac_sign = fields.zodiac_signs[getRandomInt(0, fields.zodiac_signs.length)]
    const blood_type = fields.blood_types[getRandomInt(0, fields.blood_types.length)]
    const rhesus = fields.rh_factors[getRandomInt(0, fields.rh_factors.length)]
    const gender = fields.genders[getRandomInt(0, fields.genders.length)]
    // const end_men = getRandomInt(0, fields.photo_men.length)
    // const end_women = getRandomInt(0, fields.photo_women.length)
    const photo = (gender === 'women')? fields.photo_women.shift() : fields.photo_men.shift()


    let donor = new Donor({
      number: getRandomInt(100000, 200000),
      zodiac_sign: zodiac_sign,
      height: getRandomInt(160, 195),
      weight: getRandomInt(60, 120),
      blood_type: blood_type,
      hair_color: hair_color,
      nationality: nationality,
      eye_color: eye_color,
      skin_color: skin_color,
      rhesus: rhesus,
      gender: gender,
      photo: photo,
    })
    result.push(donor)
  }

  return result;
}

const donnors = generateDonnors(32);
let filteredDonnors = ko.observableArray(Array.from(donnors));

const filters = {
  height: new RangeFilter(160, 195, 'height'),
  weight: new RangeFilter(60, 120, 'weight'),
  blood_type: new CheckboxFilter([], 'blood_type'),
  rh_factor: new RadioFilter(['+', '-'], 'rhesus'),
  eye_color: new CheckboxFilter([], 'eye_color'),
  hair_color: new CheckboxFilter([], 'hair_color'),
  skin_color: new CheckboxFilter([], 'skin_color'),
  nationality: new SelectFilter('', 'nationality'),
  zodiac_sign: new SelectFilter('', 'zodiac_sign'),
}

function performFilters() {
  filteredDonnors.splice(0); // Remove all values

  for (const donnor of donnors) {
    let checkFlag = true;
    for (const filterKey in filters) {
      const filter = filters[filterKey];
      if (filter.isSet() && !filter.check(donnor[filter.field])) {
        checkFlag = false;
        break;
      }
    }
    if (checkFlag) {
      filteredDonnors.push(donnor);
    }
  }
  filt(false)
  console.log(filteredDonnors());
}

function clean_filter() {
  let all_donnors = donnors.map((x) => x)
  filteredDonnors(all_donnors.splice(0));
  filt(false)
}

// ko.track(this)

document.getElementById('body').addEventListener('click', (e) => {
  if (e.target.localName === "body" && e.target.localName !== "filter") filt(false)
}, {
  passive: true
})

ko.applyBindings({
  donnors,
  filteredDonnors
})