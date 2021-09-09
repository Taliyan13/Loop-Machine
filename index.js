//div present the choosen beat in display-box
var beatName = document.getElementById('beat-name');

var bits = [];
var storedBits = JSON.parse(localStorage.getItem("bites"));

//help us to know if mix is playing (for pause\play music button)
var isPlaying = false;
//setintervall delay, music play after 3 sec
var delay = 3000;
        //data songs
        var data = {
            'A': { name: 'future funk', src: new Audio('120_future_funk_beats_25.mp3'), isPlaying: false },
            'B': { name: 'breakbeats', src: new Audio('120_stutter_breakbeats_16.mp3'), isPlaying: false},
            'C': { name: 'funk groove', src: new Audio('Bass Warwick heavy funk groove on E 120 BPM.mp3'), isPlaying: false},
            'D': { name: 'electric guitar', src: new Audio('electric guitar coutry slide 120bpm - B.mp3'), isPlaying: false},
            'E': { name: 'StompySlosh', src: new Audio('FUD_120_StompySlosh.mp3'), isPlaying: false},
            'F': { name: 'MazePolitics', src: new Audio('MazePolitics_120_Perc.mp3'), isPlaying: false},
            'G': { name: 'PAS3GROOVE1', src: new Audio('PAS3GROOVE1.03B.mp3'), isPlaying: false },
            'H': { name: 'Groove Tanggu', src: new Audio('GrooveB_120bpm_Tanggu.mp3'), isPlaying: false },
            'I': { name: 'SilentStar', src: new Audio('SilentStar_120_Em_OrganSynth.mp3'), isPlaying: false }
};


        var drumkit = document.getElementById('drumkit');
        var play_all;

        //play click start the interval cycle and play the mix we create
        function startPlayInterval() {
        console.log('play_all', play_all)
            if (!play_all) {
        play_all = setInterval(() => {
            console.log('asdasd')
            playAll();
        }, delay);
            }
        }

        //pause click stop the interval cycle, till the user will click "play"
        function stopPlayInterval() {
        clearInterval(play_all);
        }

//create main div and elements for songs buttons 
function construct() {
    var padContainer = document.createElement('div');
    drumkit.appendChild(padContainer);
            padContainer.classList.add('pad-container');
            for (var key in data) {
                var drumEl = document.createElement('div');
                drumEl.classList.add('drum');
                padContainer.appendChild(drumEl);

                var h2 = document.createElement('h2');
                h2.textContent = key;

                //var span = document.createElement('span');
                //span.textContent = data[key].name;

                drumEl.appendChild(h2);
                //drumEl.appendChild(span);
                //drumkit.appendChild(drumEl);
                data[key].el = drumEl;

                //onclick envent, check for each index in data array witch play\pause song 
                drumEl.addEventListener('click', function first(event) {

                    var key = event.currentTarget.querySelector('h2').textContent; //index
                    event.stopImmediatePropagation(); //for loops with the same pad
                    if (data[key].isPlaying) {
        data[key].isPlaying = !data[key].isPlaying;
                        return stopPad(data[key]);
                    }
                    //if (data[key].isPlaying == false) {
        data[key].isPlaying = !data[key].isPlaying;
                    return playPad(data[key]);

                });

             
            }
        };

        construct();

        //play mix song we choose, from startPlayInterval function.
        //start play music after one interval = 3 sec
        function playAll() {
            for (index in data) {
                if (data[index].isPlaying)
                    data[index].src.play();
                beatName.innerHTML = 'play your Mix'
            }
        }


        //pause mix song we choose, from stopPlayInterval function.
        //pause music immediately
        function pauseAll() {
            for (index in data) {
        data[index].src.pause();
            }
            stopPlayInterval();
            console.log('play_all clear', play_all)
            beatName.innerHTML = 'pause your Mix'

        }

        //click on every button letter will show the name of the song and play him.
        function playPad(audio) {
        console.log('play');
            audio.isPlaying = true;
            audio.src.play();
            audio.src.loop = true;
            beatName.innerHTML = audio.name;
}

        //click will stop the song immediately
        function stopPad(audio) {
        console.log('stop');
            audio.isPlaying = false;
            audio.src.pause();
            audio.src.currentTime = 0;
            //beatName.innerHTML = audio.name;
        }
