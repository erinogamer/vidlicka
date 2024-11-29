import fetchLyrics from "../functions/fetchLyrics";
import "../css/default.css";
import storage from "../functions/storage";
import "../css/loader2.css"
import { syllableLyrics, lineLyrics, staticLyrics, checkLowQStatus, addLinesEvListener, removeLinesEvListener, scrollToActiveLine, ClearCurrrentContainerScrollData } from "../functions/lyrics";
import ApplyDynamicBackground from "./dynamicBackground";
import Defaults from "./Defaults";
/* function firstFetched() {
    return storage.get("")
} */

export const PageRoot = document.querySelector<HTMLElement>('.Root__main-view .main-view-container div[data-overlayscrollbars-viewport]');

export default function DisplayLyricsPage() {
    //const [lyricsJson, setLyricsJson] = useState<any>();
    //const [lastFetchedLyrics, setLastFetchedLyrics] = useState<string>();
    //const [firstFetched, setFirstFetched] = useState<boolean>(false);
    //const fetchTimeoutRef = useRef(null);
    //const [edtrackpos, setEdtrackpos] = useState<number>(0);

    const elem = document.createElement("div");
    elem.id = "LyricsPageContainer";
    elem.innerHTML = `
        <div class="lyricsParent">
            <div class="loaderContainer">
                <div id="ArcadeLoader"></div>
            </div>
            <h3 class="informationBox"></h3><br />
            <div class="lyrics"></div>
        </div>
    `

    PageRoot.appendChild(elem);

    Defaults.LyricsContainerExists = true;

    ApplyDynamicBackground(document.querySelector("#LyricsPageContainer .lyricsParent"))

    addLinesEvListener();

    //useEffect(() => {
    {
        if (!Spicetify.Player.data?.item?.uri) return; // Exit if `uri` is not available
        //Intervals.LyricsInterval.Start();
        checkLowQStatus();

        const currentUri = Spicetify.Player.data.item.uri;

        fetchLyrics(currentUri).then(lyrics => {
            //storage.set("currentLyricsType", lyrics?.Type);
            if (lyrics?.Type === "Syllable") {
                syllableLyrics(lyrics);
            } else if (lyrics?.Type === "Line") {
                lineLyrics(lyrics);
            } else if (lyrics?.Type === "Static") {
                staticLyrics(lyrics);
            }
            storage.set("lastFetchedUri", currentUri);
        });
    }
    //Intervals.AnimationFrameInterval.Running ?
       // Intervals.AnimationFrameInterval.Restart() :
        //Intervals.AnimationFrameInterval.Start();


        /* 

        const firstFetched = storage.get("fetchedFirst");


            const lastFetchedUri = storage.get("lastFetchedUri");
            if (lastFetchedUri && currentUri && lastFetchedUri !== currentUri) {
                fetchLyrics(currentUri).then(lyrics => {
                    //Spicetify.LocalStorage.set("SpicyLyrics-currentLyricsType", lyrics?.Type);
                    storage.set("currentLyricsType", lyrics?.Type);
                    //Spicetify.LocalStorage.set("SpicyLyrics-currentLyricsData", JSON.stringify(lyrics));
                    //setLastFetchedLyrics(currentUri);
            
                    if (lyrics?.Type === "Syllable") {
                        syllableLyrics(lyrics);
                    } else if (lyrics?.Type === "Line") {
                        lineLyrics(lyrics);
                    } else if (lyrics?.Type === "Static") {
                        staticLyrics(lyrics);
                    }
                    storage.set("lastFetchedUri", currentUri);
                });
                return
            }

            if (firstFetched == "true") {
                return;
            }

            storage.set("fetchedFirst", "true");
            fetchLyrics(currentUri).then(lyrics => {
                //Spicetify.LocalStorage.set("SpicyLyrics-currentLyricsType", lyrics?.Type);
                storage.set("currentLyricsType", lyrics?.Type);
                //Spicetify.LocalStorage.set("SpicyLyrics-currentLyricsData", JSON.stringify(lyrics));
                //setLastFetchedLyrics(currentUri);
        
                if (lyrics?.Type === "Syllable") {
                    syllableLyrics(lyrics);
                } else if (lyrics?.Type === "Line") {
                    lineLyrics(lyrics);
                } else if (lyrics?.Type === "Static") {
                    staticLyrics(lyrics);
                }
                
            }); */
        
    
        //})

    
        /* let lyricsData;

        if (savedLyricsData) {
            try {
                lyricsData = JSON.parse(savedLyricsData);
            } catch (error) {
                console.error("Error parsing saved lyrics data:", error);
                lyricsData = null; // Fallback if parsing fails
            }
        } */
        
        /* if (currentUri === lyricsData.id) {
            /* //setLastFetchedLyrics(currentUri);
            
            if (lyricsData.Type === "Syllable") {
                syllableLyrics(lyricsData);
            } else if (lyricsData.Type === "Line") {
                lineLyrics(lyricsData);
            } else if (lyricsData.Type === "Static") {
                staticLyrics(lyricsData);
            } 
        } else { */
            
    //}, []);
    

    /* setInterval(() => {
        const dynamicbg = document.querySelector<HTMLElement>("#LyricsPageContainer .dynamic-background");
        const lyricsPageCont = document.querySelector<HTMLElement>("#LyricsPageContainer");
        if (!dynamicbg) return;
        dynamicbg.style.width = `${lyricsPageCont.offsetWidth}px`, 
        dynamicbg.style.height = `${lyricsPageCont.offsetHeight}px`

        dynamicbg.querySelectorAll("img").forEach(img => {
            img.style.height = `${lyricsPageCont.offsetHeight}px`;
        });
    }, 200); */

    /* setInterval(() => {
        const currentTime = Spicetify.Player.getProgress();
        //setEdtrackpos(currentTime);
    }, 500); */

    //setInterval(() => {
    /* Spicetify.Player.addEventListener("onprogress", (event) => {
        const edtrackpos = event.data;
        if (!document.querySelector("#LyricsPageContainer .lyricsParent .lyrics")) return
        if (Spicetify.Platform.History.location.pathname === "/spicy-lyrics") {
            //console.log("we got here")
            document.querySelectorAll("#LyricsPageContainer .lyricsParent .lyrics .line").forEach(line => {
                //console.log("were here")
              if (line.getAttribute("start") <= edtrackpos && edtrackpos <= line.getAttribute("end")) {
                //console.log("line", line)
                //const lockInBtn = document.querySelector('#LyricsPageContainer .lockInBtn');
                const container = document.querySelector("#LyricsPageContainer .lyricsParent .lyrics");

                const containerRect = container.getBoundingClientRect();
                const elementRect = line.getBoundingClientRect();
                const offsetTop = elementRect.top - containerRect.top + container.scrollTop;
                /* const offsetPadding = () => {
                if (window.innerWidth < 475) {
                    return 227
                } else {
                    if (document.querySelector('.lyricsBigContainer').classList.contains('smallMode')) {
                    return 20
                    } else {
                    return 90
                    }
                }
                }; // Separate this logic 
                /* scrollIntoView({ behavior: "smooth" }) 
                container.scrollTo({
                    top: offsetTop - container.clientHeight / 2 + line.clientHeight / 2, // Use the value here
                    behavior: 'smooth'
                });
                //container.scrollTop = offsetTop - container.clientHeight / 2 + line.clientHeight / 2

                //Spicetify.showNotification("Is that true? " + (Spicetify.Platform.History.location.pathname === "/spicy-lyrics").toString(), false, 250) 

                //const isVisible = isElementInViewport(line, parent);
                  //if (lockInBtn.classList.contains("locked")) {
                    /* line.scrollIntoView({
                      behavior: "smooth",
                      block: "center"
                    }) 
                      //if (isVisible) {
                        //scrollElementIntoView(parent, line)
                      //}
                      /* if (!alrScrolled) {
                        scrollElementIntoView(parent, line)
                        alrScrolled = true
                      } *
                  //}
                  //if (isVisible !== false) {
                    /* const edscrt = document.querySelector("#LyricsPageContainer .lyricsParent .lyrics").scrollTop + 50
                    document.querySelector("#LyricsPageContainer .lyricsParent .lyrics").scrollTop = edscrt 
                //  }
              }
            })
          }
    //}, 2000);
    }) */

    /* Spicetify.Player.addEventListener("songchange", (event) => {
        const uri = event.data?.item?.uri;
        const lastFetchedLyrics = storage.get("lastFetchedLyrics");
        if (!uri || lastFetchedLyrics === uri) return;
        storage.set("lastFetchedUri", uri);
    
        //Spicetify.LocalStorage.set("SpicyLyrics-", null);
        storage.set("currentLyricsType", "null");
        //Spicetify.LocalStorage.set("SpicyLyrics-currentLyricsData", null);
        const lyricsElem = document.querySelector("#LyricsPageContainer .lyricsParent .lyrics");
        if (lyricsElem) {
            lyricsElem.innerHTML = "";
        }
    
        /* if (fetchTimeoutRef.current) {
            clearTimeout(fetchTimeoutRef.current);
        }
    
        fetchTimeoutRef.current = setTimeout(() => { 
            fetchLyrics(uri).then(lyrics => {
                //Spicetify.LocalStorage.set("SpicyLyrics-currentLyricsType", lyrics?.Type);
                storage.set("currentLyricsType", lyrics?.Type);
                //Spicetify.LocalStorage.set("SpicyLyrics-currentLyricsData", JSON.stringify(lyrics));
                //setLastFetchedLyrics(uri);
    
                if (lyrics?.Type === "Syllable") {
                    syllableLyrics(lyrics);
                } else if (lyrics?.Type === "Line") {
                    lineLyrics(lyrics);
                } else if (lyrics?.Type === "Static") {
                    staticLyrics(lyrics);
                }
            });
        //}, 500);
    }); */

}

export function DestroyLyricsPage() {
    if (!PageRoot.querySelector("#LyricsPageContainer")) return
    PageRoot.querySelector("#LyricsPageContainer")?.remove();
   // Intervals.LyricsInterval.Stop();
    //Intervals.AnimationFrameInterval.Stop();
    removeLinesEvListener();
    ClearCurrrentContainerScrollData();
    Defaults.LyricsContainerExists = true;
}