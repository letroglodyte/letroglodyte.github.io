
var avoid = ['rust (all kinds)','night clubs','curious bears','super extroverts'];
var like = ['machine learning','computers (specially the imac g3)', 'sci-fi / mystery / horror books', 'all kinds of music', 'touching grass', 'updates' , 'science in general'];

var index_a = 0;
var index_l = 0;

elem_avoid = document.getElementById("avoid");
elem_like = document.getElementById("like");

setInterval(change, 3000);
function changeAvoid() {
    elem_avoid.innerHTML = avoid[index_a];
    index_a++;
    if(index_a >= avoid.length) { index_a = 0; }
    
    elem_like.innerHTML = like[index_l];
    index_l++;
    if(index_l >= like.length) { index_l = 0; }
}