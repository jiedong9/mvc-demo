import './app3.css'
import $ from 'jquery'

const eventBus = $(window)

const m = {
    data: {
        n: parseInt(localStorage.getItem('n')) || 100
    },
    create() {
    },
    delete() {
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem('n',m.data.n)
    },
    get() {
    }
}

const html = `
    <section id="app3">
        <div class="square"></div>
    </section>
`
const $element = $(html).appendTo($('body>.page'))

const $square = $('#app3 .square')
const localKey = `app3.active`
const active = localStorage.getItem(localKey) === 'yes'

$square.toggleClass('active', active)


$square.on('click', () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active')
        localStorage.setItem(localKey, 'no')
    } else {
        $square.addClass('active')
        localStorage.setItem('app3.active', 'yes')
    }
})
