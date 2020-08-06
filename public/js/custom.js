
$(document).ready(function(){
	$('.goHome').on('click',function goHome(){
     	window.location='http://localhost:3000/studentHome';
    });

    $('#apply').on('click',function applyTopic(){
     	window.location='http://localhost:3000/studentTopics';
    });

    $('.details').on('click',function applyTopic(){
     	window.location='http://localhost:3000/studentTopics/topicDetails/'+$('.details').val();
    });


});

function goTo(value){
	window.location='http://localhost:3000/studentTopics/topicDetails/'+value;
}

function apply(value){
    window.location='http://localhost:3000/studentTopics/apply/'+value;
}

function addMember(value){
    window.location='http://localhost:3000/group/addMember/'+value;
}

function groupDetails(value){
    window.location='http://localhost:3000/studentGroup';
}

function memberDetails(value){
    window.location='http://localhost:3000/group/memberDetails/'+value;
}

function download(value){
    window.location='http://localhost:3000/studentDownload/download/'+value;
}