<template>
  <div class="flex min-h-screen flex-col">
    <!-- Top Navigation Bar -->
    <nav class="flex h-16 items-center bg-blue-600 px-6 text-white">
      <h1 class="text-xl font-bold">App Navigation</h1>
    </nav>

    <!-- Main Container -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="flex h-[calc(100vh-4rem)] w-64 flex-col bg-gray-100">
        <!-- Scrollable Sidebar Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <div class="space-y-4">
            <div class="rounded bg-gray-200 p-4">Menu Item 1</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 2</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 3</div>
            <!-- Add more items to test scrolling -->
            <div class="rounded bg-gray-200 p-4">Menu Item 4</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 5</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 6</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 7</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 8</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 9</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 10</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 11</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 12</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 13</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 14</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 15</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 16</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 17</div>
            <div class="rounded bg-gray-200 p-4">Menu Item 18</div>
          </div>
        </div>

        <!-- Fixed Bottom Toolbar -->
        <div class="flex h-12 items-center justify-center border-t border-gray-300 bg-gray-200">
          Sidebar Toolbar
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 bg-white p-6">
        <h2 class="mb-4 text-2xl font-bold">Main Content Area</h2>
        <div class="rounded bg-gray-50 p-4">Content goes here...</div>
      </main>
    </div>
  </div>
</template>
