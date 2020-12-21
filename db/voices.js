const voices = new Map();

// Ordered by Type of Accent and then by Standard/Wavenet and then by Gender

// Australian Accents
voices.set(0, { languageCode: 'en-AU', ssmlGender: 'FEMALE', name: 'en-AU-Standard-A' });
voices.set(1, { languageCode: 'en-AU', ssmlGender: 'FEMALE', name: 'en-AU-Standard-C' });
voices.set(2, { languageCode: 'en-AU', ssmlGender: 'MALE', name: 'en-AU-Standard-B' });
voices.set(3, { languageCode: 'en-AU', ssmlGender: 'MALE', name: 'en-AU-Standard-D' });
voices.set(4, { languageCode: 'en-AU', ssmlGender: 'FEMALE', name: 'en-AU-Wavenet-A' });
voices.set(5, { languageCode: 'en-AU', ssmlGender: 'FEMALE', name: 'en-AU-Wavenet-C' });
voices.set(6, { languageCode: 'en-AU', ssmlGender: 'MALE', name: 'en-AU-Wavenet-B' });
voices.set(7, { languageCode: 'en-AU', ssmlGender: 'MALE', name: 'en-AU-Wavenet-D' });

// Indian Accents
voices.set(8, { languageCode: 'en-IN', ssmlGender: 'FEMALE', name: 'en-IN-Standard-A' });
voices.set(9, { languageCode: 'en-IN', ssmlGender: 'MALE', name: 'en-IN-Standard-B' });
voices.set(10, { languageCode: 'en-IN', ssmlGender: 'MALE', name: 'en-IN-Standard-C' });
voices.set(11, { languageCode: 'en-IN', ssmlGender: 'FEMALE', name: 'en-IN-Wavenet-A' });
voices.set(12, { languageCode: 'en-IN', ssmlGender: 'MALE', name: 'en-IN-Wavenet-B' });
voices.set(13, { languageCode: 'en-IN', ssmlGender: 'MALE', name: 'en-IN-Wavenet-C' });

// British Accents
voices.set(14, { languageCode: 'en-GB', ssmlGender: 'FEMALE', name: 'en-GB-Standard-A' });
voices.set(15, { languageCode: 'en-GB', ssmlGender: 'FEMALE', name: 'en-GB-Standard-C' });
voices.set(16, { languageCode: 'en-GB', ssmlGender: 'MALE', name: 'en-GB-Standard-B' });
voices.set(17, { languageCode: 'en-GB', ssmlGender: 'MALE', name: 'en-GB-Standard-D' });
voices.set(18, { languageCode: 'en-GB', ssmlGender: 'FEMALE', name: 'en-GB-Wavenet-A' });
voices.set(19, { languageCode: 'en-GB', ssmlGender: 'FEMALE', name: 'en-GB-Wavenet-C' });
voices.set(20, { languageCode: 'en-GB', ssmlGender: 'MALE', name: 'en-GB-Wavenet-B' });
voices.set(21, { languageCode: 'en-GB', ssmlGender: 'MALE', name: 'en-GB-Wavenet-D' });

// American Accents
voices.set(22, { languageCode: 'en-US', ssmlGender: 'FEMALE', name: 'en-US-Standard-C' });
voices.set(23, { languageCode: 'en-US', ssmlGender: 'FEMALE', name: 'en-US-Standard-E' });
voices.set(24, { languageCode: 'en-US', ssmlGender: 'MALE', name: 'en-US-Standard-B' });
voices.set(25, { languageCode: 'en-US', ssmlGender: 'MALE', name: 'en-US-Standard-D' });
voices.set(26, { languageCode: 'en-US', ssmlGender: 'FEMALE', name: 'en-GB-Wavenet-C' });
voices.set(27, { languageCode: 'en-US', ssmlGender: 'FEMALE', name: 'en-GB-Wavenet-E' });
voices.set(28, { languageCode: 'en-US', ssmlGender: 'FEMALE', name: 'en-GB-Wavenet-F' });
voices.set(29, { languageCode: 'en-US', ssmlGender: 'MALE', name: 'en-GB-Wavenet-A' });
voices.set(30, { languageCode: 'en-US', ssmlGender: 'MALE', name: 'en-GB-Wavenet-B' });
voices.set(31, { languageCode: 'en-US', ssmlGender: 'MALE', name: 'en-GB-Wavenet-D' });

module.exports = voices;
