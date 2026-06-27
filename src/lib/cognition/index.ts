/**
 * src/lib/cognition/index.ts
 *
 * The cognition subsystem is implemented in focused sibling modules — import
 * directly from those files rather than via this barrel:
 *
 *   - Spaced-repetition scheduling:  @/lib/cognition/sm2
 *   - FLICC manipulation taxonomy:   @/lib/cognition/flicc
 *   - FLICC claim classifier:        @/lib/cognition/flicc-classifier
 *   - MIST media-literacy scoring:   @/lib/cognition/mist
 *   - Defense outcome ledger:        @/lib/cognition/ledger
 *   - Cohort efficacy computation:   @/lib/cognition/efficacy
 *
 * There is no shared init function; each module is self-contained and
 * initialises lazily on first use. The previous no-op `initcognition`
 * export has been removed because it performed no real work and implied
 * a runtime setup step that does not exist.
 */
