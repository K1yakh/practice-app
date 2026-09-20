import { FlatList, ScrollView, StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = Math.round(SCREEN_WIDTH * 1.35);
const POSTER_WIDTH = 128;
const POSTER_HEIGHT = 192;

type MediaItem = {
  id: string;
  title: string;
  year: number;
  rating: string;
  genre: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
};

const CATALOG: MediaItem[] = [
  {
    id: '1',
    title: 'Neon Nights',
    year: 2024,
    rating: 'TV-MA',
    genre: 'Thriller',
    description: 'A detective hunts a cyber-criminal through rain-soaked megacity streets.',
    posterUrl:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
  {
    id: '2',
    title: 'Silent Horizon',
    year: 2025,
    rating: 'PG-13',
    genre: 'Sci-Fi',
    description: 'An astronaut discovers a signal that rewrites everything we know about space.',
    posterUrl:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
  {
    id: '3',
    title: 'Crimson Tide',
    year: 2023,
    rating: 'R',
    genre: 'Action',
    description: 'A rogue agent must stop a global conspiracy before the clock runs out.',
    posterUrl:
      'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
  {
    id: '4',
    title: 'Midnight Jazz',
    year: 2024,
    rating: 'TV-14',
    genre: 'Drama',
    description: 'A gifted pianist rediscovers passion in a smoky downtown club.',
    posterUrl:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
  {
    id: '5',
    title: 'Forest Echoes',
    year: 2025,
    rating: 'PG',
    genre: 'Adventure',
    description: 'Siblings follow an ancient map deep into an enchanted wilderness.',
    posterUrl:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
  {
    id: '6',
    title: 'Urban Legends',
    year: 2024,
    rating: 'TV-MA',
    genre: 'Horror',
    description: 'City myths come alive when a podcast host digs too deep.',
    posterUrl:
      'https://images.unsplash.com/photo-1509248966320-fb09f6d86e3c?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
  {
    id: '7',
    title: 'Golden Hour',
    year: 2023,
    rating: 'PG-13',
    genre: 'Romance',
    description: 'Two strangers keep meeting at the same café across seasons.',
    posterUrl:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
  {
    id: '8',
    title: 'Velocity',
    year: 2025,
    rating: 'R',
    genre: 'Sports',
    description: 'A washed-up racer gets one last shot at the championship circuit.',
    posterUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
  {
    id: '9',
    title: 'Deep Current',
    year: 2024,
    rating: 'TV-14',
    genre: 'Mystery',
    description: 'A marine biologist uncovers secrets buried beneath the reef.',
    posterUrl:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
  {
    id: '10',
    title: 'Skyline',
    year: 2025,
    rating: 'PG-13',
    genre: 'Documentary',
    description: 'Architects reshape the future of living in vertical cities.',
    posterUrl:
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=400&h=600&q=80',
    backdropUrl:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&h=1600&q=80',
  },
];

const TRENDING = CATALOG.slice(0, 6);
const NEW_RELEASES = [...CATALOG].reverse().slice(0, 6);
const HERO = CATALOG[0];

function PosterCard({ item }: { item: MediaItem }) {
  return (
    <Pressable style={styles.posterCard}>
      <Image
        source={{ uri: item.posterUrl }}
        style={styles.posterImage}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        style={styles.posterGradient}
      >
        <Text style={styles.posterTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.posterMeta}>
          {item.year} · {item.genre}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

function Carousel({ title, data }: { title: string; data: MediaItem[] }) {
  return (
    <View style={styles.carousel}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
        renderItem={({ item }) => <PosterCard item={item} />}
      />
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.hero, { height: HERO_HEIGHT }]}>
        <Image
          source={{ uri: HERO.backdropUrl }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.55)', 'transparent', 'rgba(0,0,0,0.95)']}
          locations={[0, 0.35, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
          <Text style={styles.brand}>STREAMFLIX</Text>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </View>

        <View style={styles.heroContent}>
          <Text style={styles.heroBadge}>{HERO.rating}</Text>
          <Text style={styles.heroTitle}>{HERO.title}</Text>
          <Text style={styles.heroMeta}>
            {HERO.year} · {HERO.genre}
          </Text>
          <Text style={styles.heroDescription} numberOfLines={3}>
            {HERO.description}
          </Text>
          <View style={styles.heroActions}>
            <Pressable style={styles.playButton}>
              <Ionicons name="play" size={18} color="#000" />
              <Text style={styles.playButtonText}>Play</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.secondaryButtonText}>My List</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Carousel title="Trending Now" data={TRENDING} />
      <Carousel title="New Releases" data={NEW_RELEASES} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  hero: {
    width: '100%',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  brand: {
    color: '#E50914',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    color: '#fff',
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 10,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroMeta: {
    color: '#cfcfcf',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 10,
  },
  heroDescription: {
    color: '#d8d8d8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    maxWidth: 340,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 6,
  },
  playButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(109, 109, 110, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  carousel: {
    marginTop: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  carouselContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  posterCard: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  posterGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 28,
    justifyContent: 'flex-end',
  },
  posterTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  posterMeta: {
    color: '#bdbdbd',
    fontSize: 10,
    marginTop: 2,
  },
});
