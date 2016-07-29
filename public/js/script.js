$(document).ready(function() {
    // Get all data from api
    var initLoad = function() {
        tbodyEl = $('#data');
        tbodyEl.html('');
        $.ajax({
            url: 'http://localhost:3000/api/book',
            method: 'GET',
            dataType: 'json'
        }).done(function(response) {
            response.forEach(function(book) {
                tbodyEl.append(`
                    <tr>
                        <td class="text-center">` + book.id + `</td>
                        <td class="text-center">` + book.name + `</td>
                        <td class="text-right">` + book.price + ` won</td>
                        <td class="text-center">
                            <button class="edit btn btn-info">Edit</button>
                            <button class="delete btn btn-danger">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }).fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        });
    };
    initLoad();

    // Create a datum
    $('#add').on('click', function(e) {
        e.preventDefault();
        var bookName = $('#bookName').val();
        var bookPrice = $('#bookPrice').val();

        $.ajax({
            url: 'http://localhost:3000/api/book',
            method: 'POST',
            dataType: 'json',
            data: { name: bookName, price: bookPrice }
        }).done(function(response) {
            $('input[type=text]').val('');
            initLoad();
        }).fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        });
    });

    // Get a single datum
    $('table').on('click', '.edit', function() {
        var id = $(this).parent().parent().find('td').eq(0).text();
        $('#editModal').modal('show');
        $.ajax({
            url: 'http://localhost:3000/api/book/' + id,
            method: 'GET',
            dataType: 'json',
        }).done(function(response) {
            var id = response[0].id;
            var name = response[0].name;
            var price = response[0].price;
            $('#editId').val(id);
            $('#editName').val(name);
            $('#editPrice').val(price);
        }).fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        });
    });

    // Update a datum
    $('#save').on('click', function() {
        var id = $('#editId').val();
        var updateName = $('#editName').val();
        var updatePrice = $('#editPrice').val();
        
        $.ajax({
            url: 'http://localhost:3000/api/book/' + id,
            method: 'PUT',
            dataType: 'json',
            data: { name: updateName, price: updatePrice }
        }).done(function(response) {
            $('#editModal').modal('hide');
            initLoad();
        }).fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        });
    });

    // Delete a datum
    $('table').on('click', '.delete', function(e) {
        var id = $(this).parent().parent().find('td').eq(0).text();
        $.ajax({
            url: 'http://localhost:3000/api/book/' + id,
            method: 'DELETE'
        }).done(function(response) {
            initLoad();
        }).fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        });
    });
});
