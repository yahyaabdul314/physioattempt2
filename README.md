# VR-Based Concussion Recovery Platform

Evidence-based VR platform for concussion assessment and rehabilitation. Prioritizes function over aesthetics, grounded in clinical research.

## Research Foundation

This platform is built on established clinical research:

### Assessment Protocols

#### VOMS (Vestibular/Ocular Motor Screening)
- **Evidence**: Validated tool for assessing vestibular and ocular motor function post-concussion
- **Components**: 5 core tests
  - Smooth pursuits: Tracking moving targets
  - Saccades: Rapid eye movements (horizontal/vertical)
  - Near point convergence: Eye convergence testing
  - Vestibular ocular reflex (VOR): Head movement with visual fixation
  - Visual motion sensitivity: Response to visual motion
- **Symptom Tracking**: 0-10 scale for headache, dizziness, nausea, fogginess
- **Clinical Significance**: Any symptom provocation indicates impairment

#### King-Devick Test
- **Evidence**: Rapid number naming task assessing saccadic eye movements
- **Research Data**:
  - Sensitivity: 95.8%, Specificity: 96.1% (within 7-10 days post-concussion)
  - Avg intersaccadic intervals: 324.4ms (concussed) vs 286.1ms (control)
- **Clinical Threshold**: >5 second increase from baseline or errors present
- **Three progressive cards**: Increasing difficulty in spacing and complexity

### VR Therapy Protocols

#### Clinical Protocol (6-week standard)
- **Duration**: 6 weeks
- **Frequency**: 2 sessions per week
- **Evidence**: Clinical trials show significant improvement across balance, gait, and functional measures
- **Safety**: <5% symptom provocation rate in research studies

#### Therapy Modalities

1. **Balance Training**
   - Static and dynamic balance challenges
   - Progressive surface difficulty (stable → unstable → moving)
   - Visual complexity gradation

2. **Vestibular Rehabilitation**
   - Gradual exposure to visual motion
   - VOR training (rotation, translation, optokinetic)
   - Controlled symptom provocation and habituation

3. **Dual-Task Training**
   - Simultaneous cognitive and motor tasks
   - Progressive task complexity
   - Task switching at higher levels

4. **Graded Exertion**
   - Progressive physical activity in VR environment
   - Monitored symptom response

## Architecture

### Type-Safe Clinical Models (`src/types/clinical.ts`)
- Complete TypeScript definitions for all clinical data structures
- Ensures data integrity across the platform

### Assessment Modules

#### VOMS (`src/assessments/VOMS.ts`)
- Complete implementation of VOMS protocol
- Baseline and follow-up assessments
- Automatic symptom increase calculation
- Comparison functionality for tracking recovery
- **Test Coverage**: `src/assessments/__tests__/VOMS.test.ts`

#### King-Devick (`src/assessments/KingDevick.ts`)
- Standard number sequences for 3 cards
- Time and error tracking
- Baseline comparison with clinical interpretation
- Performance percentile calculation
- **Test Coverage**: `src/assessments/__tests__/KingDevick.test.ts`

### Therapy Management (`src/therapy/VRTherapy.ts`)

#### VRTherapyManager
- Conservative progression logic (max 2-point symptom increase)
- Automatic difficulty adjustment based on performance
- Requires 3 successful sessions before progression
- Regression after adverse events or excessive symptoms
- Therapy type recommendations based on assessment results

#### Specialized Therapy Modules
- **BalanceTherapy**: Surface type and visual complexity progression
- **VestibularTherapy**: Motion type and speed progression
- **DualTaskTherapy**: Combined motor and cognitive challenges

**Test Coverage**: `src/therapy/__tests__/VRTherapy.test.ts`

### Recovery Protocol (`src/protocol/RecoveryProtocol.ts`)
- Complete 6-week protocol management
- Serial assessment tracking (initial, weekly, final)
- King-Devick baseline and follow-up tracking
- Session-by-session progress monitoring
- Automated progression readiness evaluation
- Comprehensive summary reporting
- **Test Coverage**: `src/protocol/__tests__/RecoveryProtocol.test.ts`

## Installation

```bash
npm install
```

## Development

```bash
# Run development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build
```

## Testing

Comprehensive test suite using Vitest:
- **VOMS Assessment**: 35+ test cases covering all functionality
- **King-Devick Test**: 25+ test cases including clinical thresholds
- **VR Therapy**: 40+ test cases for progression logic and safety
- **Recovery Protocol**: 20+ test cases for protocol management

All clinical thresholds and decision logic are validated by tests.

## Clinical Workflow

### 1. Initial Assessment
```typescript
// Create VOMS assessment
const vomsTool = new VOMSAssessmentTool();
const assessment = vomsTool.createAssessment(patientId);

// Administer tests and record symptoms
const updatedTest = vomsTool.recordTestResult(
  test,
  baselineSymptoms,
  postTestSymptoms
);

// Create King-Devick baseline
const kdTool = new KingDevickTestTool();
const baseline = kdTool.createTest(patientId, true);
```

### 2. Protocol Creation
```typescript
const protocolManager = new RecoveryProtocolManager();
const protocol = protocolManager.createProtocol(patientId);

// Set initial assessments
protocol = protocolManager.setInitialAssessment(protocol, vomsAssessment);
protocol = protocolManager.setKingDevickBaseline(protocol, kdBaseline);
```

### 3. Therapy Sessions
```typescript
const therapyManager = new VRTherapyManager();

// Get therapy recommendations based on assessment
const recommendations = therapyManager.recommendTherapyType(
  vomsPositiveTests
);

// Create session
const difficulty = therapyManager.createInitialDifficulty();
const session = therapyManager.createSession(
  patientId,
  recommendations[0],
  difficulty
);

// Record symptoms and complete
const completed = therapyManager.completeSession(
  session,
  symptomsAfter,
  performanceMetrics
);
```

### 4. Progress Tracking
```typescript
// Add session to protocol
protocol = protocolManager.addTherapySession(protocol, session);

// Check progress
const summary = protocolManager.generateSummary(protocol);
const readiness = protocolManager.isReadyToProgress(protocol);
```

## Safety Features

1. **Conservative Progression**
   - Maximum 2-point symptom increase threshold
   - Requires 75% success rate
   - Automatic regression on adverse events

2. **Symptom Monitoring**
   - Before, during, and after session tracking
   - Real-time symptom assessment
   - Adverse event recording

3. **Clinical Thresholds**
   - Based on published research
   - Validated by comprehensive tests
   - Clear progression/regression criteria

## Data Structures

All clinical data is strongly typed and validated. See `src/types/clinical.ts` for complete type definitions.

## Future Enhancements

- WebXR integration for VR headset support
- Real-time eye tracking integration
- Data visualization dashboards
- Patient progress reports (PDF generation)
- Clinician management interface
- Integration with EHR systems

## Research References

1. VR in concussion management - PMC7357617, PMC5964310
2. VOMS validation studies
3. King-Devick test research - sensitivity/specificity data
4. 6-week VR vestibular therapy protocols - Clinical trials (active duty military)

## License

MIT

## Clinical Disclaimer

This platform is designed for use by qualified healthcare professionals. All clinical decisions should be made by licensed practitioners. This software is for clinical research and therapeutic use under professional supervision.
