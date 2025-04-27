const successResponse = {
  code: 'OK',
  summary: 'The results have been successfully retrieved!',
  executionId: 'a74f9092-5889-430a-9c19-6712f9f68383',
  DEBUG: {
    EXECUTION_STARTED: 0,
    IMAGE_LOAD_FROM_URL: '248ms',
    IMAGE_PREPARATION_FINISHED: 248,
    OCR_PROCESS_STARTED: 250,
    TASK_ON_WORKER: '536ms',
    OCR_PROCESS_FINISHED: 786,
    BEFORE_RESPONSE: 789,
  },
  data: {
    recognizer: 'BLINK_ID',
    version: '2.8.1',
    startTime: '2019-11-20T12:13:05.052Z',
    finishTime: '2019-11-20T12:13:05.587Z',
    durationTimeInSeconds: 0.535,
    taskId: 132,
    workerId: 0,
    result: {
      firstName: 'SAMPLE',
      lastName: 'SPECIMEN',
      fullName: '',
      address: '123 MAIN STREET APT. 1\nORLANDO, FL 17101-0000',
      dateOfBirth: {
        day: 18,
        month: 3,
        year: 1990,
        originalString: '03/18/1990',
// Temp comment
      },
      dateOfIssue: {
        day: 18,
        month: 3,
