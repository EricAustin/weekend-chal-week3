console.log('JS');

$(document).ready(function () {
    console.log('JQ');

    getItems();


    $('#newItemButton').on('click', function () {
        console.log('newItemButton clicked');
        newItem = { task: $('#newItemInput').val() }
        console.log('object is:', newItem);

        sendNewItem(newItem);

    })

    $('#table').on('click', '.incompleteButton', function () {
        var itemId = $(this).parent().parent().data().id;
        console.log('complete click', itemId);

        $.ajax({
            method: 'PUT',
            url: '/list/complete/' + itemId,
            success: function (response) {
                getItems();
            }
        });
    });

    $('#table').on('click', '.completeButton', function () {
        var itemId = $(this).parent().parent().data().id;
        console.log('incomplete click', itemId);

        $.ajax({
            method: 'PUT',
            url: '/list/incomplete/' + itemId,
            success: function (response) {
                getItems();
            }
        });
    });

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

    });


    function getItems() {
        console.log('in getItems');
        $.ajax({
            url: '/list',
            type: 'GET',
            success: function (data) {
                console.log('got the list: ', data);
                displayList(data);
            } // end success
        }); //end ajax
    }

    function sendNewItem(newItem) {
        console.log('sending newItem', newItem);
        // ajax call to server to get koalas
        $.ajax({
            url: '/list',
            type: 'POST',
            data: newItem,
            success: function (data) {
                console.log('sending: ', newItem);
                getItems();
                $('#newItemInput').val('');
            } // end success
        }); //end ajax
    }

    //function 

    function displayList(data) {
        $('#tableBody').empty();
        for (var i = 0; i < data.length; i++) {
            // console.log('data is', data);

            var item = data[i];
            // console.log('item is', item);
            var $task = $('<tr class="w3_row"></tr>');
            $task.data('id', item.id);

            if (item.complete == true) {
                $task.prepend(
                    '<td class="complete task col-sm-8">' + item.task + '</td>' +
                    '<td class="col-sm-2"> <button class="btn-info completeButton">Completed</button></td>' +
                    '<td class="col-sm-2"> <button class="btn-primary deleteButton">Delete this task</button></td>')
            } else {
                $task.prepend(
                    '<td class="incomplete task col-sm-8">' + item.task + '</td>' +
                    '<td class="col-sm-2"> <button class="btn-danger incompleteButton">Incomplete</button></td>' +
                    '<td class="col-sm-2"> <button class="btn-primary deleteButton">Delete this task</button></td>')
            }


            $('#tableBody').append($task);



        }
    }

}) //end of Doc ready
