import './app3.css'
import $ from 'jquery'

const eventBus = $(window)
const localKey = `app3.active`

const m = {

    data: {
        active :localStorage.getItem(localKey) === 'yes'
    },
    create() {
    },
    delete() {
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem('active',m.data.active)
    },
    get() {
    }
}

const v = {
    html :`
<div>
    <div class="square"></div>
</div>
  
`,
    init(container) {
        v.el = $(container)
    },
    render() {
        if (v.el.children.length !== 0) v.el.empty()
        $(v.html).appendTo(v.el)
    }
}

const c = {
    init(container) {
        v.init(container)
        v.render(m.data.active) // view = render(data)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.active)
        })
    },
    events: {
        'click .square': 'x',
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        console.log(index)
        m.update({index: index})
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            v.el.on(part1, part2, value)
        }
    }
}


$square.on('click', () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active')
        localStorage.setItem(localKey, 'no')
    } else {
        $square.addClass('active')
        localStorage.setItem('app3.active', 'yes')
    }
})

export default c
