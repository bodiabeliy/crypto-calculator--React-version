"use strict"
//Check supporting WEBP and add class webp or no-webp to HTML
function isWebp() {
	// Check supporting WEBP
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// add class webp or no-webp to HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
isWebp();

//Custom Select 

let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}


let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}

//=================================================================================
// Hide dublicate placehorder==========================
const inputSearch = document.querySelector('.search__input');
const plcholderSearch = document.querySelector('.search__placeholder');
if (inputSearch) {
	inputSearch.oninput = function () {
		if (inputSearch.value != 0) {
			plcholderSearch.style.display = "none";
		}
		if (inputSearch.value == 0) {
			plcholderSearch.style.display = "flex";
		}
	}
}


//=================================================

//Класс вертикальных линий в гриде===
const gridLine = document.querySelectorAll('.grid__result-search');
if (window.innerWidth > 991.98) {
	for (let i = 1; i < gridLine.length;) {

		gridLine[i].classList.add('line');
		i = i + 3;
	}
}
if (window.innerWidth < 991.98) {
	for (let i = 0; i < gridLine.length;) {

		gridLine[i].classList.add('line');

		i = i + 2;
	}
}
window.addEventListener('resize', function () {
	if (window.innerWidth > 991.98) {
		for (let i = 0; i < gridLine.length;) {

			gridLine[i].classList.remove('line');

			i = i + 2;
		}
		for (let i = 1; i < gridLine.length;) {
			if (!gridLine[i].classList.contains('line')) {
				gridLine[i].classList.add('line');
			}
			i = i + 3;
		}
	}
	if (window.innerWidth < 991.98) {
		for (let i = 1; i < gridLine.length;) {
			gridLine[i].classList.remove('line');
			i = i + 3;
		}
		for (let i = 0; i < gridLine.length;) {
			if (!gridLine[i].classList.contains('line')) {
				gridLine[i].classList.add('line');
			}
			i = i + 2;
		}
	}
});



//===================================

// Цвета значений ====================

for (let i = 0; i < gridLine.length; i++) {
	let text = gridLine[i].querySelector('.grid__item-value').innerText;
	if (text.indexOf('+') != -1 && text.indexOf('%') != -1) {
		gridLine[i].querySelector('.grid__item-value').style.color = '#61a570';
	}
	if (text.indexOf('-') != -1 && text.indexOf('%') != -1) {
		gridLine[i].querySelector('.grid__item-value').style.color = '#ac6153';
	}
}
//Blur эффект=============================
if (document.querySelector('.table__grid') && document.querySelector('.table__grid').classList.contains('no-payed')) {
	for (let i = Math.round(gridLine.length / 3 * 2); i < gridLine.length; i++) {
		gridLine[i].classList.add('blur');
		gridLine[i].querySelector('.grid__item-text  span').style.cursor = "none";
	}
}

//==========================
//Подсказка в таблице================================
const infoBtn = document.querySelectorAll('.grid__item-i');
const info = document.querySelectorAll('.grid__item-subtext');
for (let i = 0; i < infoBtn.length; i++) {
	infoBtn[i].addEventListener('click', function () {
		infoBtn[i].classList.add('no-active');
		info[i].classList.add('active');
		function addOpacity() {
			info[i].style.opacity = "1"
		}
		setTimeout(addOpacity, 500)
	})
}

for (let i = 0; i < info.length; i++) {
	info[i].addEventListener('click', function () {
		infoBtn[i].classList.remove('no-active');
		info[i].style.opacity = "0";
		function removeOpacity() {
			info[i].classList.remove('active');
		}
		setTimeout(removeOpacity, 500)
	})
}


//===================================================

//Изменение стилей тарифных планов
const btnTarifs = document.querySelectorAll('.price__button');
const tarifs = document.querySelectorAll('.price__item');
const radioInputs = document.querySelectorAll('.price__input-radio');
const radiolables = document.querySelectorAll('.price__item-title_radio');
if (radiolables.length > 0) {
	for (let i = 0; i < tarifs.length; i++) {
		if (radioInputs[i].checked) {
			tarifs[i].classList.add('checked');
		}
		radioInputs[i].addEventListener('change', function () {
			if (!tarifs[i].classList.contains('checked') && radioInputs[i].checked) {
				tarifs[i].classList.add('checked');
			}
			for (let j = 0; j < radioInputs.length; j++) {
				if (tarifs[j].classList.contains('checked') && !radioInputs[j].checked) {
					tarifs[j].classList.remove('checked');
				}
			}
		})
		for (let y = 0; y < radioInputs.length; y++) {
			if (!tarifs[y].classList.contains("checked")) {
				radiolables[y].addEventListener('mouseenter', function () {
					tarifs[y].classList.add('hover');
				})
				radiolables[y].addEventListener('mouseleave', function () {
					tarifs[y].classList.remove('hover');
				})
			}
		}
	}
}

for (let i = 0; i < btnTarifs.length; i++) {
	btnTarifs[i].addEventListener('click', function () {
		for (let j = 0; j < tarifs.length; j++) {
			if (tarifs[j].classList.contains('active')) {
				tarifs[j].classList.remove('active');
			}
		}
		if (!tarifs[i].classList.contains('active')) {
			tarifs[i].classList.add('active');
		}
	})
	if (!tarifs[i].classList.contains("active")) {
		btnTarifs[i].addEventListener('mouseenter', function () {
			tarifs[i].classList.add('hover');
		})
		btnTarifs[i].addEventListener('mouseleave', function () {
			tarifs[i].classList.remove('hover');
		})
	}

}
//переключение стрелочек вверх вниз
const arrowsUp = document.querySelectorAll('.arrowUp');
const arrowsDown = document.querySelectorAll('.arrowDown');
for (let i = 0; i < arrowsUp.length; i++) {
	arrowsUp[i].addEventListener('click', function () {
		if (!arrowsUp[i].classList.contains('active')) {
			arrowsUp[i].classList.add('active')
			arrowsUp[i].src = "img/arrowUp.png";
			arrowsUp[i].style.transform = 'rotate(0deg)'

		}
		if (arrowsDown[i].classList.contains('active')) {
			arrowsDown[i].classList.remove('active');
			arrowsDown[i].style.transform = 'rotate(0deg)'
			arrowsDown[i].src = "img/arrowDown.png";
		}
	})
}
for (let i = 0; i < arrowsDown.length; i++) {
	arrowsDown[i].addEventListener('click', function () {
		if (!arrowsDown[i].classList.contains('active')) {
			arrowsDown[i].classList.add('active')
			arrowsDown[i].src = "img/arrowUp.png";
			arrowsDown[i].style.transform = 'rotate(180deg)'
			arrowsUp[i].src = "img/arrowDown.png";
			arrowsUp[i].style.transform = 'rotate(180deg)'
		}
		if (arrowsUp[i].classList.contains('active')) {
			arrowsUp[i].classList.remove('active');
		}
	})
}
