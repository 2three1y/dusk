# Dusk

Dusk is a free, open-source English (US) voice for [Piper](https://github.com/OHF-Voice/piper1-gpl) text-to-speech.

I use a screen reader all day, so I wanted a voice that's:

- **Clear**: clean audio, easy to understand.
- **Lively**: real ups and downs in pitch, not a flat drone.
- **Quick**: stays crisp when the speech rate is cranked way up.

## Status: still training

Dusk isn't trained yet. Training runs on Google Colab with the notebook in this repo, and it takes a few sessions. When she's done, the voice files go up on this repo's [Releases](https://github.com/2three1y/dusk/releases) page, along with audio samples. Until then there's nothing to download yet except the notebook.

## Versions

| Version | Files | For |
|---|---|---|
| **Dusk Compact** | `dusk-compact-ios.zip`: half-size `en_US-dusk-high.onnx` (about 58 MB) + `.onnx.json`, plus the split streaming pair `en_US-dusk-high.encoder.onnx` / `en_US-dusk-high.decoder.onnx` | iPhone (Piper - Neural TTS app) |
| **Dusk Standard** | `dusk-standard.zip`: full-size `en_US-dusk-high.onnx` (about 110 MB) + `.onnx.json` | NVDA, Android, Piper on a computer, Home Assistant |
| **Dusk Enhanced** | Coming later | The same voice, trained longer on more of her recordings |

All versions are the same voice: inside the settings file the name is `dusk` and the quality is `high`, so apps list her as "Dusk". Keep each `.onnx` next to its `.onnx.json` with the same name.

## Install (once the files are out)

Short versions below. Longer notes: [docs/integrations.md](docs/integrations.md).

### iPhone (VoiceOver), with Dusk Compact

Uses the free, open-source app [Piper - Neural TTS](https://apps.apple.com/us/app/piper-neural-tts/id6759636010) (needs iOS 18).

1. Download `dusk-compact-ios.zip` from Releases and unzip it in the Files app. Keep the files in **On My iPhone**, not in iCloud or Dropbox (files that aren't fully downloaded can fail to import without saying anything).
2. Open Piper - Neural TTS, go to Settings, then **Import Model from Files**.
3. Select `en_US-dusk-high.onnx` and `en_US-dusk-high.onnx.json` in one pick. If your app version supports split voices, also select `en_US-dusk-high.encoder.onnx` and `en_US-dusk-high.decoder.onnx`. Then tap Install.
4. In iPhone Settings: Accessibility, VoiceOver, Speech, then Add Voice (or Voice), English, and choose **Dusk**. You can also pick her for Spoken Content.

Why Compact on iPhone: iOS gives voice apps limited memory, and a full-size high voice can get cut off on long text, so VoiceOver falls back to its default voice. The half-size version avoids that.

Updating to a newer Dusk: after importing, switch VoiceOver to another voice and back (or restart the phone) so it loads the new one.

### NVDA (Windows), with Dusk Standard

1. Install the [Sonata Neural Voices](https://github.com/mush42/sonata-nvda) add-on.
2. Download `en_US-dusk-high-nvda-sonata.tar.gz` from Releases.
3. In NVDA: open Sonata's voice manager, Installed tab, "Install from local file", pick the file.
4. Restart NVDA, then choose Sonata and Dusk in NVDA's speech settings.

### Android, with Dusk Standard

1. Install [SherpaTTS](https://f-droid.org/en/packages/org.woheller69.ttsengine/) from F-Droid (Android 10 or newer).
2. Download `vits-piper-en_US-dusk-high.tar.bz2` from Releases and unpack it.
3. In SherpaTTS: Manage Languages, Install from SD Card, language code `eng`, name `Dusk`, then pick `en_US-dusk-high.onnx` and `tokens.txt` from the unpacked folder.
4. Android Settings, Accessibility, Text-to-speech output: choose SherpaTTS.

### Piper (Windows, Mac, Linux), with Dusk Standard

```
pip install piper-tts
python3 -m piper -m en_US-dusk-high --data-dir /folder/with/both/files -f test.wav -- "Hi, I'm Dusk."
```

### Home Assistant

Put both Standard files in `/share/piper` and restart.

### JAWS (Windows): not tested yet

JAWS can use Windows SAPI 5 voices, and [windows-text-to-speech](https://github.com/Lej77/windows-text-to-speech) is a SAPI 5 bridge that runs Piper voices. I haven't confirmed it works with JAWS yet. Steps are in [docs/integrations.md](docs/integrations.md).

## Default speed

The `.onnx.json` sets a default pace of about 144 words per minute. Your screen reader's rate slider still goes faster or slower from there.

## Train it yourself

Open [`dusk_colab.ipynb`](dusk_colab.ipynb) in Google Colab (free T4 GPU), then Runtime, Run all. It saves all progress to one folder in your Google Drive (`Dev/Dusk`) so it can resume after Colab disconnects, and it doesn't touch anything else in your Drive. The finished voice lands in `Dev/Dusk/export` as `dusk-standard.zip` and `dusk-compact-ios.zip`.

### About the Compact export (partly unverified)

The Compact files are made with a half-precision (fp16) conversion and Piper's own encoder/decoder splitter. I tested this exact recipe on the public LJ Speech "high" voice, and it produced files that match the Piper iPhone app's own published compact files (same inputs and outputs, identical audio with randomness off).

**UNVERIFIED:** nobody has imported Dusk Compact on an actual iPhone yet (she isn't trained). Split voices are new in the iPhone app (its 1.0.16 test build), so the App Store version may not accept the two split files yet. The half-size `.onnx` + `.onnx.json` work without them.

## Credits

- **Voice data:** "Hi-Fi Multi-Speaker English TTS Dataset" (Hi-Fi TTS) by Evelina Bakhturina, Vitaly Lavrukhin, Boris Ginsburg and Yang Zhang (NVIDIA), 2021. https://www.openslr.org/109/ . Licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Reader:** Celine Major, Hi-Fi TTS speaker 11697 (a LibriVox volunteer reader). Original recordings from [LibriVox](https://librivox.org), public domain.
- **Changes to the data:** about 3.5 hours of her clips selected for pitch range, resampled to 22,050 Hz and loudness-normalized.
- **Starting model:** Piper "ljspeech" high checkpoint by Bryce Beattie (public domain), https://huggingface.co/datasets/rhasspy/piper-checkpoints , trained on the [LJ Speech Dataset](https://keithito.com/LJ-Speech-Dataset/) by Keith Ito and Linda Johnson (public domain).
- **Trained with Piper:** https://github.com/OHF-Voice/piper1-gpl
- **iPhone app:** Piper - Neural TTS by Ihor Shevchuk, https://github.com/piper-tts-apps/piper-app-apple

Dusk is not endorsed by the reader, NVIDIA, LibriVox, the Piper project or the app's developer. See [MODEL_CARD.md](MODEL_CARD.md) for the full data notice.

## License

- **Code** (the notebook and scripts): [MIT](LICENSE).
- **Voice files** (once released): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), inherited from the training data. Use them, share them, build on them, including in apps. Just keep the credits above with them.

---

Co-written with Tab
