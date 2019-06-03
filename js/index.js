$(document).ready(function () {
    //Variables
    const $sb = $('input');
    const url = 'https://api.github.com/search/users?q=';
    const url_user = 'https://api.github.com/users/';
    let $input = '';
    let $card = $('.card');
    console.log($card);


    ////////////////////////////// -- Find Users -- //////////////////////////////
    //Pressing "Enter" in the search bar calls "gettingUsers" function
    $sb.keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('.card').remove();
            gettingUsers();
        }
        event.stopPropagation();
    });

    //Assigns the input text to the $input variable 
    $sb.keyup(function () {
        $input = $sb.val();
        console.log($input);
    });

    //Getting users data
    function gettingUsers() {
        $.get(url + $input)
            .done(function (result) { mount(result); })
            .fail(function () { console.log("Request failed!"); });
    }

    function mount(result) {
        let until = result.items.length > 8 ? 7 : result.items.length - 1;
        console.log(until);
        for (let i = 0; i <= until; i++) {
            console.log(result.items[i].avatar_url)
            $('.cards').append(`
            <div class="card">
                <img src="${result.items[i].avatar_url}">
                <div class="login">${result.items[i].login}</div>
                <div  class="html-url"><a href="${result.items[i].html_url}">${result.items[i].html_url}</a></div>
                <div class="score">Score: ${Math.round(result.items[i].score)}</div>
                <button user="${result.items[i].login}">VER DETALHES</button>
            </div>`)
        }
    }



    //Getting full data of one user
    // $( "button" ).on( "click", function() {
    //     console.log( $( this ).text() );
    // });
    $(document).on("click", "button", function () {
        $('.specs').remove();
        console.log(url_user + $(this).attr('user'));
        $.get(url_user + $(this).attr('user'))
            .done(function (result) { console.log(result); mountUserData(result) })
            .fail(function () { console.log("Request failed!"); });
        $('.overlay-back, #wrapper').fadeIn(500);


    });
    $(document).on("click", ".overlay-back, #wrapper", function () {
        $('.overlay-back, #wrapper').fadeOut(500);
    })
    function mountUserData(result) {
        $('#fixed_div').append(`
            <div class="specs">
                <img src="${result.avatar_url}" alt="">
                <p>Cadastrado em ${formatDate(result.created_at)}</p>
            </div>
            <div class="specs">
                <div class="section" id="first">
                    <div class="name">${result.name}</div>
                    <div class="login-card">${result.login}</div>
                    <div  class="html-url-card"><a href="${result.html_url}">${result.html_url}</a></div>
                </div>
                <hr>
                <div class="section">
                    <div class="inline">
                        <div class="folowers">Seguidores</div>  
                        <div class="folowers-result">${result.followers}</div>
                    </div>
                    <div class="inline">
                        <div class="folowers">Seguindo</div>  
                        <div class="folowers-result">${result.following}</div>
                    </div>
                </div>
                <hr>
                <div class="section">
                    <div class="subtitle">Email</div> 
                    <div class="text">${result.email ? result.email : '--------'}</div>
                </div>
                <hr>
                <div class="section">
                    <div class="subtitle">Blog</div> 
                    <div class="text">${result.blog ? result.blog : '--------'}</div>
                </div>
            </div>
        `)
    }
    function formatDate(date) {
        const monthNames = ['Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const day = date[8] + date[9];
        const month = monthNames[parseInt(date[5] + date[6]) - 1]
        const year = date[0] + date[1] + date[2] + date[3];
        console.log('olha aqui em baixo')
        console.log(day)
        console.log(month)
        console.log(year)
        console.log(`${day} de ${month}, ${year}`);
        return `${day} de ${month}, ${year}`;
    }





});



