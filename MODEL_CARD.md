# Model card: Dusk (en_US, high)

**Status:** not trained yet. This card describes the planned release. Voice files will be published on the [Releases](https://github.com/2three1y/dusk/releases) page when training is done.

## Overview

- **Name:** dusk (shown in apps as "Dusk")
- **Language:** en_US (English, United States)
- **Speakers:** 1
- **Quality:** high (Piper VITS "high" architecture)
- **Sample rate:** 22,050 Hz
- **Default pace:** about 144 words per minute (set in the `.onnx.json`)
- **Goal:** a clear, lively voice (natural pitch movement, not monotone) that stays understandable at fast screen-reader speeds.

## Versions

| Version | Contents | Notes |
|---|---|---|
| Dusk Compact | fp16 `en_US-dusk-high.onnx` + split `en_US-dusk-high.encoder.onnx` / `en_US-dusk-high.decoder.onnx` + `.onnx.json` | For the iPhone app Piper - Neural TTS. About half the size, lower memory use. |
| Dusk Standard | fp32 `en_US-dusk-high.onnx` + `.onnx.json` | Full size, for NVDA, Android, Piper on a computer, Home Assistant. |
| Dusk Enhanced | Coming later | Same voice, trained longer on more of the same reader's recordings. |

All versions share one settings file identity: `"dataset": "dusk"`, `"audio": {"quality": "high"}`.

The Compact recipe (fp16 conversion with onnxconverter-common, `keep_io_types=True`, plus a node-type fix; then Piper's `split_voice_for_streaming`) was checked on the public LJ Speech high voice, where it reproduced the Piper iPhone app's own published compact files. It is **unverified on a real iPhone with Dusk**, and split voices may need the app's newer test build.

## Training data

- **Dataset:** Hi-Fi Multi-Speaker English TTS Dataset (Hi-Fi TTS), OpenSLR resource 109: https://www.openslr.org/109/
- **Authors:** Evelina Bakhturina, Vitaly Lavrukhin, Boris Ginsburg, Yang Zhang (NVIDIA)
- **Paper:** "Hi-Fi Multi-Speaker English TTS Dataset", Interspeech 2021, https://arxiv.org/abs/2104.01497
- **License:** Creative Commons Attribution 4.0 International (CC BY 4.0), https://creativecommons.org/licenses/by/4.0/
- **Speaker used:** reader 11697, Celine Major (LibriVox volunteer reader). The underlying LibriVox recordings are in the public domain (https://librivox.org).
- **Copy used:** the parquet mirror `MikhailT/hifi-tts` on Hugging Face (revision pinned in the notebook), which repackages OpenSLR 109.
- **Changes made:** about 3.5 hours of this reader's clips were selected (preferring wider pitch range, dropping the noisiest clips and odd character voices), resampled to 22,050 Hz and loudness-normalized. No other speakers' audio is used.

## Base checkpoint

- **Piper "ljspeech" high checkpoint** by Bryce Beattie, released into the public domain: https://huggingface.co/datasets/rhasspy/piper-checkpoints (`en/en_US/ljspeech/high/`)
- Trained on the **LJ Speech Dataset** by Keith Ito and Linda Johnson (public domain): https://keithito.com/LJ-Speech-Dataset/
- Dusk is fine-tuned from this checkpoint, so it starts from a model that already knows English.

## Training software

- Piper (piper1-gpl): https://github.com/OHF-Voice/piper1-gpl (commit pinned in the notebook). Piper's code is GPL-3.0; the code is used to train, and is not part of the voice files.

## License of the voice

The Dusk voice files will be released under **CC BY 4.0**, because the training data is CC BY 4.0. You can use, share and adapt them for any purpose, including commercially, as long as you give credit. Suggested attribution:

> Dusk voice by 2three1y (https://github.com/2three1y/dusk), CC BY 4.0. Trained on Hi-Fi TTS (Bakhturina, Lavrukhin, Ginsburg, Zhang; NVIDIA; CC BY 4.0), reader Celine Major (LibriVox), fine-tuned from the public-domain Piper ljspeech high checkpoint by Bryce Beattie.

The code in this repo (the notebook) is MIT-licensed; see [LICENSE](LICENSE).

## Intended use and limits

- Intended for screen readers, reading aloud and other text-to-speech use.
- English (US) only. Other languages will sound wrong.
- This is a synthetic voice. Don't use it to impersonate the reader or anyone else.
- Dusk is not endorsed by the reader, NVIDIA, LibriVox or the Piper project.

---

Co-written with Tab
