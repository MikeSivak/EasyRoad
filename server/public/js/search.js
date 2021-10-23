function checkBaseFields() {
    let city = document.getElementById('city');
    let dep_addr = document.getElementById('dep_addr');
    let arr_addr = document.getElementById('arr_addr');
    let dep_date = document.getElementById('dep_date');

    let searchForm = document.getElementById('fullSearchForm');

    if (city.value && dep_addr.value && arr_addr.value && dep_date.value) {
        searchForm.hidden = false;
    }
    if(!city.value || !dep_addr.value || !arr_addr.value || !dep_date.value){
        searchForm.hidden = true;
    }
}