import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { UnitFlashcardData } from '@/data/unitFlashcards'; // Update path as needed

// Register a standard font (optional, but good for consistency)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/0.ttf' }, // Placeholder, standard fonts work by default too
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#333',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc',
    paddingBottom: 5,
  },
  // Terms Table
  termRow: {
    flexDirection: 'row',
    marginBottom: 6,
    borderBottom: '1px solid #eee',
    paddingBottom: 4,
  },
  termCol: {
    width: '30%',
    fontWeight: 'bold',
    paddingRight: 10,
  },
  defCol: {
    width: '70%',
  },
  // Questions - allow breaking across pages
  questionBox: {
    marginBottom: 12,
  },
  questionLabel: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#555',
    fontSize: 9,
  },
  // Answer Key (Upside Down) - on its own page
  answerKeyPage: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#333',
  },
  answerKeyContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    transform: 'rotate(180deg)',
  },
  answerKeyTitle: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  answerRow: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  answerItem: {
    width: '48%',
  },
  graphImage: {
    width: '100%',
    height: 120,
    objectFit: 'contain',
    border: '1px solid #eee',
  },
});

interface StudyPacketProps {
  lessonTitle: string;
  flashcards: UnitFlashcardData[];
}

const MAX_GRAPHING_SCENARIOS = 5;
const MAX_RULE_QUESTIONS = 5;

export const StudyPacketPDF = ({ lessonTitle, flashcards }: StudyPacketProps) => {
  // 1. Separate the data; cap graphing to 5 and rules to 5 per unit
  const terms = flashcards.filter((f) => f.type === 'list');
  const graphs = flashcards.filter((f) => f.type === 'rapid-fire' && f.tag === 'GRAPH').slice(0, MAX_GRAPHING_SCENARIOS);
  const rules = flashcards.filter((f) => f.type === 'rapid-fire' && f.tag === 'RULE').slice(0, MAX_RULE_QUESTIONS);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* --- HEADER --- */}
        <Text style={styles.header}>{lessonTitle} Study Guide</Text>

        {/* --- SECTION 1: KEY TERMS --- */}
        {terms.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Key Terms & Definitions</Text>
            {terms.map((card) => (
              <View key={card.id} style={styles.termRow}>
                <Text style={styles.termCol}>{card.front}</Text>
                <Text style={styles.defCol}>{card.back}</Text>
              </View>
            ))}
          </View>
        )}

        {/* --- SECTION 2: GRAPHING SCENARIOS --- (allow wrap so content can flow to next page) */}
        {graphs.length > 0 && (
          <View break>
            <Text style={styles.sectionTitle}>Graphing Situations</Text>
            {graphs.map((card, i) => (
              <View key={card.id} style={styles.questionBox}>
                <Text style={styles.questionLabel}>Scenario {i + 1}:</Text>
                <Text>{card.front}</Text>
                <View style={{ height: 80, border: '1px solid #ddd', marginTop: 5 }} />
              </View>
            ))}
          </View>
        )}

        {/* --- SECTION 3: CORE RULES --- (allow wrap so content can flow to next page) */}
        {rules.length > 0 && (
          <View break>
            <Text style={styles.sectionTitle}>Essential Rules & Concepts</Text>
            {rules.map((card, i) => (
              <View key={card.id} style={styles.questionBox}>
                <Text style={styles.questionLabel}>Question {i + 1}:</Text>
                <Text>{card.front}</Text>
                <View style={{ height: 30, borderBottom: '1px solid #ddd', marginTop: 5 }} />
              </View>
            ))}
          </View>
        )}

      </Page>

      {/* --- ANSWER KEY (UPSIDE DOWN) on its own page for consistent spacing --- */}
      {(rules.length > 0 || graphs.length > 0) && (
        <Page size="A4" style={styles.answerKeyPage}>
          <View style={styles.answerKeyContainer}>
            <Text style={styles.answerKeyTitle}>Answer Key (Flip Page to Read)</Text>

            {rules.length > 0 && (
              <>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>Rules</Text>
                {rules.map((card, i) => (
                  <View key={`ans-rule-${card.id}`} style={{ marginBottom: 5 }}>
                    <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Q{i + 1}: {card.front}</Text>
                    <Text>{card.back}</Text>
                  </View>
                ))}
              </>
            )}

            {graphs.length > 0 && (
              <>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 15, marginBottom: 5 }}>Graphs</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {graphs.map((card, i) => (
                    <View key={`ans-graph-${card.id}`} style={styles.answerItem}>
                      <Text style={{ fontSize: 9, marginBottom: 2 }}>Scenario {i + 1}</Text>
                      <Text style={{ fontSize: 9, marginBottom: 2 }}>{card.back}</Text>
                      {card.backImage ? (
                        /* @ts-ignore: react-pdf types sometimes complain about src vs source */
                        <Image style={styles.graphImage} src={card.backImage} />
                      ) : (
                        <Text style={{ fontSize: 8, color: 'red' }}>No Image Available</Text>
                      )}
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        </Page>
      )}
    </Document>
  );
};