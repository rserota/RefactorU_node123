$(document).ready(function(){
    setTimeout(function(){console.log($.post)
    $.post('/yo', function(data){
        console.log(data)
    })},2000)

    $('#theForm').on('submit', function(event){
        event.preventDefault()
        console.log($('#theForm').serialize())
        $.post('/', $('#theForm').serialize(), function(data){
            $('body').append(data)
        })
    })
})