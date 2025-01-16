import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/react';
import { volumeHighOutline, bookmarkOutline } from 'ionicons/icons';

/**
 * Sample data. Could be replaced with an API call or more advanced data source.
 */
type WordDefinition = {
  word: string;
  definition: string;
  partOfSpeech: string;
};

const sampleData: WordDefinition[] = [
  {
    word: 'example',
    definition: 'A thing characteristic of its kind or illustrating a general rule.',
    partOfSpeech: 'noun',
  },
  {
    word: 'react',
    definition: 'Respond or behave in a particular way in response to something.',
    partOfSpeech: 'verb',
  },
  {
    word: 'ionic',
    definition: 'Of or relating to ions.',
    partOfSpeech: 'adjective',
  },
];

/**
 * Subcomponent to display a single word entry as an Ionic Card.
 */
const WordCard: React.FC<WordDefinition> = ({ word, definition, partOfSpeech }) => {
  const handleVolumeClick = () => {
    console.log(`Play audio for: ${word}`);
  };

  const handleAddToList = () => {
    return Promise.resolve({ success: true, message: 'Bookmark added!' }).then((result) => {
      console.log(result.message);
    });
  };

  return (
    <IonCard>
      <IonCardHeader>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleVolumeClick}
        >
          <IonIcon icon={volumeHighOutline} style={{ marginRight: 8 }} />
          <IonCardTitle>{word}</IonCardTitle>
        </div>
        <IonCardSubtitle>{partOfSpeech}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <p>{definition}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IonButton fill="clear" onClick={handleAddToList}>
            <IonIcon slot="icon-only" icon={bookmarkOutline} />
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

/**
 * Main page that includes the search bar, result list, placeholder states,
 * and a search history dropdown using IonAccordion.
 */
const SearchPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredWords, setFilteredWords] = useState<WordDefinition[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  /**
   * When the search text changes, update filtered words
   * and track each new, non-empty query in searchHistory.
   */
  const handleSearch = (text: string) => {
    setSearchText(text);

    if (text.trim() === '') {
      setFilteredWords([]);
      return;
    }

    // Record the search term in history
    setSearchHistory((prev) => [...prev, text.trim()]);

    // Filter the sample data (or call an API here)
    const results = sampleData.filter((item) =>
      item.word.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredWords(results);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Word Search</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => handleSearch(e.detail.value!)}
          placeholder="Search for a word..."
        />

        {/* Conditionally show placeholders or results */}
        {searchText.trim() === '' ? (
          /* 1) If user hasn't typed anything, show a prompt */
          <IonList>
            <IonItem lines="none">
              <IonLabel>Type in a word to start searching.</IonLabel>
            </IonItem>
          </IonList>
        ) : filteredWords.length === 0 ? (
          /* 2) If user typed something but no matches, show 'No results found' */
          <IonList>
            <IonItem lines="none">
              <IonLabel>No results found.</IonLabel>
            </IonItem>
          </IonList>
        ) : (
          /* 3) Otherwise, show the matching results */
          <IonList>
            {filteredWords.map(({ word, definition, partOfSpeech }, index) => (
              <IonItem lines="none" key={index}>
                <WordCard
                  word={word}
                  definition={definition}
                  partOfSpeech={partOfSpeech}
                />
              </IonItem>
            ))}
          </IonList>
        )}

        {/* Search History Dropdown */}
        <IonAccordionGroup>
          <IonAccordion value="searchHistory">
            <IonItem slot="header" lines="none">
              <IonLabel>Search History</IonLabel>
            </IonItem>
            <IonList slot="content">
              {searchHistory.length === 0 ? (
                <IonItem lines="none">
                  <IonLabel>No previous searches yet</IonLabel>
                </IonItem>
              ) : (
                searchHistory.map((term, index) => (
                  <IonItem lines="none" key={index}>
                    <IonLabel>{term}</IonLabel>
                  </IonItem>
                ))
              )}
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
