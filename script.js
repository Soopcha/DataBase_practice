var yandex_function_url = 'https://functions.yandexcloud.net/d4erf6q0rr854cv3e3sq'

$(document).ready(function () {
    $('#search_button').hide();
    $("#Vrach").hide();
    $('.error_message').hide();

    $.ajax({
        url: yandex_function_url,
        method: 'GET',
        data: {
            "data": "automobile_list"
        },
        // ����, �����������, ����� ������� ��������� �� 
        // �������� ��������� ������
        success: function (data) {
            $("#Vrach").show();
            $('#search_button').show();
            console.log(preconvert_json(data))
            console.log(JSON.parse(preconvert_json(data)))
            update_car_list(data)
        }
    }).fail(function (data) {
        output_error("GET request failed");
    })

    // �� ������� �� ������� ���� ������ �������� ��������� 
    // POST ������, ��������� ������
    $.ajax({
        url: yandex_function_url,
        method: 'POST',
        success: function (data) {
            console.log(data);
        }
    }).fail(function (data) {
        output_error("POST request failed");
    })
});
// ����� ��� ����������� ������� python � �������������� js ������
function preconvert_json(string) {
    let json = string.split('\'').join("\"");
    return json.split('b\"').join("\"");
}

// �����, ������� ����� ��������� ������� ���������� �������
function update_car_list(data) {
    $("#Vrach td").parent().remove();
    let received_cars = JSON.parse(preconvert_json(data));
    if (received_cars.length > 0) {
        for (let i = 0; i < received_cars.length; ++i) {
            // ������� ������ ������ ��� ������ ��������� ��������
            let vrachik = new Vrachik(received_cars[i]);
            // ��������� ����� �������� �� ID, �������� �� ���� ���������
            // ������� � ����� tr - table row
            $('#Vrach tr:last').after(vrachik.to_table_entry());
        }
        $("#Vrach").show();
    } else {
        output_error("Incorrect data received")
    }
}

// �����, ������� ������� ��������� �� ������ � ������ � ����� ���� ������ 
function output_error(message, timeout = 2000) {
    $('.error_message').show();
    $('.error_message').text(message);
    setTimeout(function () {
        $('.error_message').hide();
    }, timeout);
}