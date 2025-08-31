// 🎵 Playlist (add more songs here)
const playlist = [
	{ src: "music/Happy Birthday (Piano Version) - Helmut Schenker (youtube).mp3", name: "Happy Birthday" },
	{ src: "music/Rumi & Jinu - Free (Lyrics) KPop Demon Hunters.mp3", name: "Free" },
	{ src: "music/Dionela - Oksihina (Lyrics) - Dan Music (youtube).mp3", name: "Oksihina" }
];
let currentSong = 0;

const music = document.getElementById("bg-music");
const nowPlaying = document.getElementById("now-playing");

// Load first song
music.src = playlist[currentSong].src;
music.volume = 0.3  ; // default volume
nowPlaying.textContent = "🎵 " + playlist[currentSong].name;

// Toggle message when checkbox changes
$("#messageState").on("change", (x) => {
	$(".message").removeClass("openNor").removeClass("closeNor");
	if ($("#messageState").is(":checked")) {
		$(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
		$(".cake").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
		$(".container").stop().animate({"backgroundColor": "#a8d8ff"}, 2000); // pastel blue
		launchConfetti();
	} else {
		$(".message").removeClass("no-anim").addClass("closeNor");
		$(".cake").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
		$(".container").stop().animate({"backgroundColor": "#d9f1ff"}, 2000); // light blue
	}
});

// Run when animation ends (message)
$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	if ($(".message").hasClass("closeNor"))
		$(".message").addClass("closed");
	$(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
});

// Run when animation ends (cake)
$(".cake").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	if (!$(".cake").hasClass("closeHer"))
		$(".cake").addClass("openedHer").addClass("beating");
	else
		$(".cake").addClass("no-anim").removeClass("beating");
	$(".cake").removeClass("openHer").removeClass("closeHer");
});

// ✅ Play music & show controls when cake is clicked
$(".cake").on("click", function () {
	let controls = $("#music-controls");

	if (music.paused) {
		music.play();
		controls.show().css("opacity", "1");
	}
	launchConfetti();
});

// ✅ Pause/Play toggle
$("#pause-btn").on("click", function () {
	if (!music.paused) {
		music.pause();
		$(this).text("▶ Play");
	} else {
		music.play();
		$(this).text("⏸ Pause");
	}
});

// ✅ Next Song button
$("#next-btn").on("click", function () {
	currentSong = (currentSong + 1) % playlist.length; // loop playlist
	music.src = playlist[currentSong].src;
	nowPlaying.textContent = "🎵 " + playlist[currentSong].name;
	music.play();
	$("#pause-btn").text("⏸ Pause");
});

// ✅ Auto-play next when song ends
music.addEventListener("ended", function () {
	currentSong = (currentSong + 1) % playlist.length;
	music.src = playlist[currentSong].src;
	nowPlaying.textContent = "🎵 " + playlist[currentSong].name;
	music.play();
});

// 🎊 Confetti Function
function launchConfetti() {
	var duration = 3 * 1000;
	var animationEnd = Date.now() + duration;
	var defaults = { 
		startVelocity: 30, 
		spread: 360, 
		ticks: 60, 
		zIndex: 2000,
		colors: ['#ff8ba0', '#fff0d9', '#6b3e26']
	};

	function randomInRange(min, max) {
		return Math.random() * (max - min) + min;
	}

	var interval = setInterval(function() {
		var timeLeft = animationEnd - Date.now();

		if (timeLeft <= 0) {
			return clearInterval(interval);
		}

		var particleCount = 50 * (timeLeft / duration);
		confetti(Object.assign({}, defaults, { 
			particleCount, 
			origin: { x: randomInRange(0.3, 0.7), y: Math.random() - 0.2 }
		}));
	}, 250);
}
