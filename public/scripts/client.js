// console.log('JS');

$(document).ready(function () {
    // console.log('JQ');

    getItems();

    // event handlers

    $('#newItemButton').on('click', function () {
        // console.log('newItemButton clicked');
        addToList();

    });
    function addToList() {
        newItem = { task: $('#newItemInput').val() }
        // console.log('object is:', newItem);
        if ($('#newItemInput').val()) {
            sendNewItem(newItem);
        } else {
            alert("You can't do nothing!")
        }
    }; // click finished

$('#newItemInput').keyup(function (event) {
    if (event.keyCode == '13') {
        addToList();
    }
});

$('#table').on('click', '.incompleteButton', function () {
    var itemId = $(this).parent().parent().data().id;
    // console.log('complete click', itemId);

    $.ajax({
        method: 'PUT',
        url: '/list/complete/' + itemId,
        success: function (response) {
            getItems();
        }
    });
}); // click finished

$('#table').on('click', '.completeButton', function () {
    var itemId = $(this).parent().parent().data().id;
    // console.log('incomplete click', itemId);

    $.ajax({
        method: 'PUT',
        url: '/list/incomplete/' + itemId,
        success: function (response) {
            getItems();
        }
    });
}); // click finished

$('body').on('click', '.deleteButton', function () {
    var itemId = $(this).parent().parent().data().id;
    var really = confirm("Are you sure you want to delete this?");
    if (really == true) {
        $.ajax({
            method: 'DELETE',
            url: '/list/' + itemId,
            success: function (response) {
                getItems();
            }
        });
    }
}); // click finished

// functions:

function getItems() {
    // console.log('in getItems');
    $.ajax({
        url: '/list',
        type: 'GET',
        success: function (data) {
            // console.log('got the list: ', data);
            displayList(data);
        } // end success
    }); // end ajax
}; // end getItems

function sendNewItem(newItem) {
    // console.log('sending newItem', newItem);
    // ajax call to server to get list
    $.ajax({
        url: '/list',
        type: 'POST',
        data: newItem,
        success: function (data) {
            // console.log('sending: ', newItem);
            getItems();
            $('#newItemInput').val('');
        } // end success
    }); // end ajax
}; // end sendNewItem



function displayList(data) {
    $('#tableBody').empty();
    for (var i = 0; i < data.length; i++) {
        // console.log('data is', data);

        var item = data[i];
        // console.log('item is', item);
        var $task = $('<tr class="w3_row"></tr>');
        $task.data('id', item.id);

        if (item.complete == true) {
            $task.append(
                '<td class="complete task col-sm-8">' + item.task + '</td>' +
                '<td class="col-sm-2"> <button class="btn-info completeButton">Completed</button></td>' +
                '<td class="col-sm-2"> <button class="btn-primary deleteButton">Delete this</button></td>')
            $('#tableBody').append($task);
        } else {
            $task.prepend(
                '<td class="incomplete task col-sm-8">' + item.task + '</td>' +
                '<td class="col-sm-2"> <button class="btn-danger incompleteButton">Incomplete</button></td>' +
                '<td class="col-sm-2"> <button class="btn-primary deleteButton">Delete this</button></td>')
            $('#tableBody').prepend($task);

        }

    } // end for
} // end displayList

}) // end (document).ready
