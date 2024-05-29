/**
 * Creative Impact Factor
 *
 * This script serves as a demo for measuring an ad creative's impact factor.
 * @version     3.2.0
 * @date        2024-01-11
 * @copyright   StudioM, Bram Korsten, Jos van de Manakker
 */

let ciAdset = "SEAT-1145"; // Change this adset to match your creative
let ciVersion = "ci_custom_v3.2"; // The version of this script, only change if you know what you're doing
let ciKosiVersion = "4.1.5"; // The version of Kosi
let ciVariant = false; // Don't change, you can change this via manage

let ciObserver;
let ciDidIntersectOnce = false;

let ciTotalTimeInView = 0;

let ciTimer = false;

let ciHasFiredUnloadEvents = false;

export function createCIMetrics() {
	// USE ONLY FOR DEBUGGING
	// kosi.setDebug(true);
	// kosi.setDebugMode("advanced");

	kosi.setTemplateType(ciVersion);

	const bodyClass =
		window.content.bodyClass && window.content.bodyClass.value !== ""
			? window.content.bodyClass.value
			: "default";
	const ciTag =
		window.content.ciTag && window.content.ciTag.value !== ""
			? window.content.ciTag.value
			: "no-tag";

	// Set the correct variant data
	ciVariant = `${ciAdset}_CI_${ciTag}_${bodyClass}`;
	kosi.setVariant(ciVariant);
	kosi.trackInteraction("other", "ci_impression");

	if (
		!("IntersectionObserver" in window) ||
		!("IntersectionObserverEntry" in window) ||
		!("intersectionRatio" in window.IntersectionObserverEntry.prototype)
	) {
		kosi.trackInteraction("other", "ci_observer_not_supported");
		return;
	}

	// Create the intersection observer
	ciObserver = new IntersectionObserver(onIntersectionChanged, {
		rootMargin: "0px",
		threshold: 0.9,
	});

	// Start observing the creative
	ciObserver.observe($("#creative_container")[0]);

	document.addEventListener("unload", () => {
		calculateTimeBeforeUnload();
		createBeacon("other", "ci_on_creative_unload_beacon", {
			timePassed: ciTotalTimeInView,
		});
		kosi.trackInteraction("other", "ci_on_creative_unload_bare", {
			timePassed: ciTotalTimeInView,
		});
	});

	document.addEventListener("pagehide", () => {
		calculateTimeBeforeUnload();
		createBeacon("other", "ci_on_page_hide_beacon", {
			timePassed: ciTotalTimeInView,
		});
		kosi.trackInteraction("other", "ci_on_page_hide_bare", {
			timePassed: ciTotalTimeInView,
		});
	});

	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden") {
			calculateTimeBeforeUnload();
			createBeacon("other", "ci_on_visibility_hidden_beacon", {
				timePassed: ciTotalTimeInView,
			});
			kosi.trackInteraction("other", "ci_on_visibility_hidden_bare", {
				timePassed: ciTotalTimeInView,
			});
		}
	});

	kosi.trackInteraction("other", "ci_logic_completed");
}

function calculateTimeBeforeUnload() {
	let currentTimeInView = 0;

	if (!ciHasFiredUnloadEvents) {
		ciHasFiredUnloadEvents = true;
		if (ciTimer) {
			currentTimeInView = precisionRound(new Date() - ciTimer, 1);
		}
		ciTotalTimeInView = precisionRound(
			ciTotalTimeInView + currentTimeInView,
			1
		);
	}

	// console.log('Calculated time in view before unload:', currentTimeInView);
	// console.log('Calculated TOTAL time in view before unload:', ciTotalTimeInView);
}

// Callback method for when the intersection changes
function onIntersectionChanged(entries, observer) {
	const observerEntry = entries[0];
	// If this is the first event, record it

	if (observerEntry.isIntersecting) {
		if (!ciDidIntersectOnce) {
			ciDidIntersectOnce = true;
			kosi.trackInteraction("other", "ci_did_intersect_once");
		}
		// Creative is in view, start recording data
		ciTimer = new Date();
	} else {
		// If we haven't intersected yet, don't send data
		if (!ciDidIntersectOnce) return;
		// Creative is no longer in view, send data
		const currentTimeInView = precisionRound(new Date() - ciTimer, 1);
		// const prevTotalTimeinView = ciTotalTimeInView;
		ciTotalTimeInView = precisionRound(
			ciTotalTimeInView + currentTimeInView,
			1
		);

		// console.log('Time in view: ', currentTimeInView);
		// console.log('Previous total time in view: ', prevTotalTimeinView);
		// console.log('Total time in view: ', ciTotalTimeInView);

		kosi.trackInteraction("other", "ci_time_in_view", {
			timePassed: currentTimeInView,
		});
		kosi.trackInteraction("other", "ci_total_time_in_view", {
			timePassed: ciTotalTimeInView,
		});
	}
}

/**
 * Create a kosi beacon that can be sent while the page is unloaded
 */
function createBeacon(type, label, data) {
	const params = new URLSearchParams();
	params.append("uid", "0");
	params.append("gdpr_consent", "true");
	params.append("clientid", window.kosiSettings.client.split("::")[1]);
	params.append("bannerid", window.kosiSettings.campaign);
	const sizeTagFromMeta = document.querySelector('[name="ad.size"]');
	const dimensions = sizeTagFromMeta.getAttribute("content").match(/\d+/g);
	params.append("bannersize", `${dimensions[0]}x${dimensions[1]}`);
	params.append("interactiontype", type);
	params.append("interactionlabel", label);
	params.append("interactionarea", "ci_beacon");
	params.append("mousecoordinatesx", "0");
	params.append("mousecoordinatesy", "0");
	params.append("timepassed", data.timePassed || 0);
	params.append("currentphase", "start");
	params.append("currentphase", "start");
	params.append("numberofeventstriggered", "0");
	params.append("variant", ciVariant);
	params.append("lemonpiadsetid", "0");
	params.append("appnexuscampaignid", "0");
	params.append("appnexuscreativeid", "0");
	params.append("appnexusadvertiserid", "0");
	params.append("templatetype", ciVersion);
	params.append("kosiversion", ciKosiVersion);
	params.append("environment", "live");
	params.append("impressionid", "0");
	params.append(
		"screenresolution",
		`${window.screen.width}x${window.screen.height}`
	);
	params.append("devicepixelratio", `${window.devicePixelRatio || 1}`);

	params.forEach((value, key) => {
		params.set(key, encodeURIComponent(value));
	});

	const url = `https://track.ghgjarvis.com/kosi?${params.toString()}`;
	navigator.sendBeacon(url);
}

function precisionRound(number, precision) {
	number = Number(number);
	if (precision) {
		// Shift with exponential notation to avoid floating-point issues.
		let pair = (number.toString() + "e").split("e");
		let value = Math.round(pair[0] + "e" + (Number(pair[1]) + precision));
		pair = (value.toString() + "e").split("e");
		return Number(pair[0] + "e" + (Number(pair[1]) - precision));
	}
	return Math.round(number);
}
