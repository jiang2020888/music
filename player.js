const bindEventPlay = function(audio, artist, songs) {
    let button = e('.fa-play')
    button.addEventListener('click', function() {
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
    })
    changeArtist(artist)
    changeSong(songs)
}

const changePicture = function(srcPic) {
    let pic = e('.audio-picture')
    pic.src = srcPic
}

const changeArtist = function(artist) {
    let slide = e('.info__artist')
    let numberOfSong = parseInt(slide.dataset.artists, 10)
    let activeIndex = parseInt(slide.dataset.show, 10)
    let nextIndex = (activeIndex + 1) % numberOfSong
    let nextSelector = '#id-artist-' + String(nextIndex)
    slide.dataset.show = String(nextIndex)
    let className = 'show'
    removeClassAll(className)
    let art = e(nextSelector)
    art.classList.add(className)
    log('end')
}

const changeSong = function(songs) {
    let slide = e('.info__song')
    let numberOfSong = parseInt(slide.dataset.song, 10)
    let activeIndex = parseInt(slide.dataset.active, 10)
    let nextIndex = (activeIndex + 1) % numberOfSong
    let nextSelector = '#id-songs-' + String(nextIndex)
    slide.dataset.active = String(nextIndex)
    let className = 'active'
    removeClassAll(className)
    let song = e(nextSelector)
    song.classList.add(className)
}

const Time = function(time) {
    let fen = Math.floor(time / 60)
    let mc = time % 60
    if (fen < 10) {
        fens = '0' + String(fen)
    } else {
        fens = String(fen)
    }
    if (mc < 10) {
        mcs = '0' + String(mc)
    } else {
        mcs = String(mc)
    }
    return `
            ${fens}:${mcs}
        `
}

const demoTotalTimer = function(audio) {
    audio.addEventListener('canplay', function() {
        let duration = Math.ceil(audio.duration)
        let time = Time(duration)
        let span2 = e('#id-duration')
        span2.innerHTML = time
    })
}

const demoPresentTimer = function(audio) {
    let interval = 1000
    setInterval(function() {
        let current = audio.currentTime
        let currentTime = Math.ceil(current)
        let time = Time(currentTime)
        let span1 = e('#id-currentTime')
        span1.innerHTML = time

        let range = e('.inner')
        let durationTime = Math.ceil(audio.duration)
        width = currentTime / durationTime * 100
        range.style.width = String(width) + '%'
    }, interval)
}

const bindJndutc = (audio) => {
    let inner = e('.inner')
    let outer = e('.outer')
    let dot = e('.dot')
    let max = outer.offsetWidth
    let moving = false
    let offset = 0
    dot.addEventListener('mousedown', (event) => {
        offset = event.clientX - dot.offsetLeft
        moving = true
    })

    document.addEventListener('mouseup', () => {
        moving = false
    })

    document.addEventListener('mousemove', (event) => {
        if (moving) {
            let x = event.clientX - offset
            if (x > max) {
                x = max
            }
            if (x < 0) {
                x = 0
            }
            let width = (x / max) * 100
            inner.style.width = String(width) + '%'
            let duration = audio.duration
            audio.currentTime = duration * width / 100
            audio.play()
        }
    })
}

const bindPlaylist = function(audio, pictures) {
    let list = '.songs-list'
    bindAll(list, 'click', function(event) {
        let self = event.target
        let song = self.dataset.path
        let index = self.dataset.index
        let srcMic = "audio/" + song
        let srcPic = 'picture/' + pictures[index]
        changePicture(srcPic)
        audio.src = srcMic
        audio.play()
    })
}

const bindEventList = function(audio, pictures) {
    let button = e('.fa-ellipsis-h')
    button.addEventListener('mouseover', function() {
        log('self')
        let content = document.querySelector('.songs-list')
        content.classList.toggle('show')
        bindPlaylist(audio, pictures)
        bindEventEnded(audio)
    })
}

const bindEventEnded = function(audio) {
    audio.addEventListener('ended', function() {
        audio.play()
    })
}

const bindEventSingle = function(audio) {
    let button = e('.fa-undo')
    button.addEventListener('click', function() {
        audio.play()
        bindEventEnded(audio)
   })
}

const bindEventBackward = function(audio, pictures, artist, songs) {
    let button = e('.fa-step-backward')
    button.addEventListener('click', function() {
        let slide = e('.change-list')
        let numberOfSong = parseInt(slide.dataset.songs, 10)
        let activeIndex = parseInt(slide.dataset.active, 10)
        let nextIndex = (activeIndex - 1 + numberOfSong) % numberOfSong
        let nextSelector = '#id-song-' + String(nextIndex)
        slide.dataset.active = String(nextIndex)
        let className = 'song-list-active'
        removeClassAll(className)
        let song = e(nextSelector)
        song.classList.add(className)
        let newSrc = 'audio/' + String(nextIndex + 1) + '.mp3'
        audio.src = newSrc
        let srcPic = 'picture/' + pictures[nextIndex]
        changePicture(srcPic)
        audio.play()
        bindEventEnded(audio)
        changeArtist(artist)
        changeSong(songs)
    })
}

const bindEventForward = function(audio, pictures, artist, songs) {
    let button = e('.fa-step-forward')
    button.addEventListener('click', function() {
        let slide = e('.change-list')
        let numberOfSong = parseInt(slide.dataset.songs, 10)
        let activeIndex = parseInt(slide.dataset.active, 10)
        let nextIndex = (activeIndex + 1) % numberOfSong
        let nextSelector = '#id-song-' + String(nextIndex)
        slide.dataset.active = String(nextIndex)
        let className = 'song-list-active'
        removeClassAll(className)
        let song = e(nextSelector)
        song.classList.add(className)
        let newSrc = 'audio/' + String(nextIndex + 1) + '.mp3'
        audio.src = newSrc
        let srcPic = 'picture/' + pictures[nextIndex]
        changePicture(srcPic)
        audio.play()
        bindEventEnded(audio)
        changeArtist(artist)
        changeSong(songs)
    })
}

const choice = function(array) {
    let a = Math.random()
    let b = a * array
    return Math.ceil(b)

}

const bindEventRandom = function(audio, pictures, artist, songs) {
    let button = e('.fa-random')
    button.addEventListener('click', function() {
        let slide = e('.change-list')
        let array = parseInt(slide.dataset.songs)
        let index = choice(array)
        let nextIndex = (index + 1) % array
        let nextSelector = '#id-song-' + String(nextIndex)
        let activeIndex = parseInt(slide.dataset.active, 10)
        slide.dataset.active = String(nextIndex)
        let className = 'song-list-active'
        removeClassAll(className)
        let song = e(nextSelector)
        song.classList.add(className)
        let newSrc = 'audio/' + String(nextIndex) + '.mp3'
        audio.src = newSrc
        let srcPic = 'picture/' + pictures[nextIndex]
        changePicture(srcPic)
        audio.play()
        bindEventEnded(audio)
        changeArtist(artist)
        changeSong(songs)
    })
}

// 实现点亮小红心
const bindheart = function() {
    let button = e('.fa-heart-o')
    button.addEventListener('click', function() {
        let className = 'fa-heart-active'
        if (button.classList.contains(className)) {
            removeClassAll(className)
        } else {
            button.classList.add(className)
        }
    })
}

const bindEvents = function() {
    let pictures = [
        '0.png',
        '1.png',
        '2.png',
    ]
    let audio = e('#fa-play')
    let artist = e('.info__artist')
    let songs = e('.info__song')
    bindJndutc(audio)
    demoTotalTimer(audio)
    bindEventPlay(audio, artist, songs)
    demoPresentTimer(audio)
    bindEventSingle(audio)
    bindEventForward(audio, pictures, artist, songs)
    bindEventBackward(audio, pictures, artist, songs)
    bindEventRandom(audio, pictures, artist, songs)
    // bindheart(audio)
    bindEventList(audio, pictures)

}

const __main = function() {
    bindEvents()
}

__main()

